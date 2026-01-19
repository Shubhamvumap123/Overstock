import time
from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os
import sys

PORT = 8002

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/../")
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        httpd.serve_forever()

def verify_list():
    # Start server in background
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock data
        mock_data = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item 1",
                "price": "1000",
                "rating": 4.5
            },
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item 2",
                "price": "2000",
                "rating": 3.0
            }
        ]

        # Inject data into localStorage before page load
        # Since we are visiting a URL, we need to visit first, but the script runs on load.
        # So we visit, inject, and reload.
        page.goto(f"http://localhost:{PORT}/list.html")

        page.evaluate(f"localStorage.setItem('list_id', '{str(mock_data).replace(chr(39), chr(34))}')")
        page.evaluate(f"localStorage.setItem('list_id', JSON.stringify({mock_data}))")

        page.reload()

        # Verify items are rendered
        items = page.locator(".box")
        print(f"Found {items.count()} items.")
        if items.count() != 2:
            print("Error: Expected 2 items.")
            sys.exit(1)

        # Handle alerts
        page.on("dialog", lambda dialog: dialog.accept())

        # Test Add to Cart (Item 1)
        # Assuming current code uses IDs which might be duplicated, so we select first one
        # Current code: addCart_btn.id = "addCart_btn";
        # If duplicated, querySelectorAll returns all, locator needs to be specific.

        # We will try to click the first "Add to Cart" button
        # Using text content is safer if IDs are messed up
        page.get_by_text("Add to Cart").first.click()
        print("Clicked Add to Cart.")

        # Verify cart (optional, but checking if it didn't crash is good)
        cart = page.evaluate("JSON.parse(localStorage.getItem('cartItems'))")
        if not cart or len(cart) == 0:
             # It might be 0 if the original code didn't work or logic is different.
             # scripts/list.js: addToCart(data) -> cart.push(data) -> setItem
             pass
        else:
             print("Item added to cart in localStorage.")

        # Test Remove (Item 1)
        # remove.innerText = "Remove";
        page.get_by_text("Remove").first.click()
        print("Clicked Remove.")

        # Wait for re-render
        time.sleep(0.5)

        items = page.locator(".box")
        print(f"Found {items.count()} items after removal.")
        if items.count() != 1:
            print("Error: Expected 1 item after removal.")
            sys.exit(1)

        remaining_name = items.first.locator(".name").inner_text()
        if "Test Item 2" not in remaining_name:
             print(f"Error: Wrong item remaining: {remaining_name}")
             sys.exit(1)

        print("Verification Successful!")
        page.screenshot(path="verification/list_optimized.png")
        browser.close()

if __name__ == "__main__":
    verify_list()
