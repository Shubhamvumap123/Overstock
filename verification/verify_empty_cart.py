import time
from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os
import sys
import json

PORT = 8004

def run_server():
    # Serve from the root of the repo
    # The script is in verification/, so we go up one level
    os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/../")
    Handler = http.server.SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"serving at port {PORT}")
            httpd.serve_forever()
    except OSError as e:
        print(f"Port {PORT} already in use or error: {e}")

def verify_empty_cart():
    # Start server in background
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("--- Testing Empty Cart State ---")
        # 1. Test Empty Cart
        page.goto(f"http://localhost:{PORT}/cart.html")

        # Ensure localStorage is empty for cartItems
        page.evaluate("localStorage.setItem('cartItems', '[]')")
        page.reload()

        # Check for Empty State text
        # Since I haven't implemented it yet, I expect this to FAIL if I asserted existence.
        # But this script is for verification, so I will check if it exists and print result.

        content = page.content()
        if "Your Cart is Empty" in content:
            print("PASS: Empty state message found.")
        else:
            print("FAIL: Empty state message NOT found (Expected before implementation).")

        if "Start Shopping" in content:
             print("PASS: Start Shopping button found.")
        else:
             print("FAIL: Start Shopping button NOT found (Expected before implementation).")

        # Check that right side (Total) is hidden or empty
        right_display = page.evaluate("document.getElementById('right').style.display")
        if right_display == "none":
            print("PASS: Right side is hidden.")
        else:
             print(f"FAIL: Right side display is '{right_display}' (Expected 'none' after implementation).")

        page.screenshot(path="verification/verify_empty_cart_empty_state.png")

        print("\n--- Testing Non-Empty Cart State ---")
        # 2. Test Non-Empty Cart
        mock_cart = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item",
                "price": "100"
            }
        ]
        page.evaluate(f"localStorage.setItem('cartItems', JSON.stringify({json.dumps(mock_cart)}))")
        page.reload()

        # Check that item is displayed
        items = page.locator("#left > div")
        if items.count() > 0:
            print(f"PASS: Found {items.count()} items in cart.")
        else:
            print("FAIL: No items found in cart.")

        # Check that empty state is GONE
        content = page.content()
        if "Your Cart is Empty" not in content:
            print("PASS: Empty state message is NOT visible.")
        else:
             print("FAIL: Empty state message IS visible when it should not be.")

        page.screenshot(path="verification/verify_empty_cart_result.png")
        browser.close()

if __name__ == "__main__":
    verify_empty_cart()
