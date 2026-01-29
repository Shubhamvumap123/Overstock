import time
from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os
import sys
import json

PORT = 8003

def run_server():
    # Serve from the root of the repo
    os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/../")
    Handler = http.server.SimpleHTTPRequestHandler
    # Use allow_reuse_address to avoid "Address already in use" errors on restart
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"serving at port {PORT}")
        httpd.serve_forever()

def verify_cart():
    # Start server in background
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock data for cart
        mock_cart = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Cart Item 1",
                "price": "1000"
            },
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Cart Item 2",
                "price": "2000"
            }
        ]

        # Navigate to cart page
        page.goto(f"http://localhost:{PORT}/cart.html")

        # Inject data
        page.evaluate(f"localStorage.setItem('cartItems', JSON.stringify({json.dumps(mock_cart)}))")

        # Reload to render with injected data
        page.reload()

        # Verify items are rendered
        items = page.locator("#left > div")
        print(f"Found {items.count()} items.")

        if items.count() != 2:
            print("Error: Expected 2 items.")
            sys.exit(1)

        # Verify that the Remove element is a button with class remove-btn
        remove_btn = page.locator(".remove-btn").first
        if remove_btn.count() == 0:
            print("Error: .remove-btn not found.")
            sys.exit(1)

        tag_name = remove_btn.evaluate("el => el.tagName")
        if tag_name != "BUTTON":
            print(f"Error: Remove element is not a button, it is {tag_name}.")
            sys.exit(1)

        # Test Remove (Item 1)
        remove_btn.click()
        print("Clicked Remove on first item.")

        # Wait for re-render
        time.sleep(0.5)

        items = page.locator("#left > div")
        print(f"Found {items.count()} items after removal.")

        if items.count() != 1:
            print("Error: Expected 1 item after removal.")
            sys.exit(1)

        # Verify the remaining item is "Cart Item 2"
        remaining_text = items.first.inner_text()
        if "Cart Item 2" not in remaining_text:
             print(f"Error: Wrong item remaining. Content: {remaining_text}")
             sys.exit(1)

        print("Verification Successful!")
        page.screenshot(path="verification/cart_verification.png")
        browser.close()

if __name__ == "__main__":
    verify_cart()
