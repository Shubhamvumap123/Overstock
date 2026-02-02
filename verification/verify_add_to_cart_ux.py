import time
from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os
import sys
import json

PORT = 8005

def run_server():
    # Serve from the root of the repo
    os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/../")
    Handler = http.server.SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"serving at port {PORT}")
        httpd.serve_forever()

def verify_ux():
    # Start server in background
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock Product Data
        mock_product = {
            "imageURL": "https://via.placeholder.com/150",
            "name": "Test Product",
            "price": "100",
            "rating": 4.5,
            "img1": "https://via.placeholder.com/50",
            "img2": "https://via.placeholder.com/50",
            "img3": "https://via.placeholder.com/50",
            "img4": "https://via.placeholder.com/50"
        }

        # Intercept API call
        page.route("**/products/*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps(mock_product)
        ))

        # Navigate to product page with ID
        page.goto(f"http://localhost:{PORT}/productPage.html?id=123")

        # Wait for product to load
        try:
            page.wait_for_selector("#addCart_btn", timeout=5000)
            print("Product page loaded successfully.")
        except Exception as e:
            print("Error: Product page did not load or add to cart button missing.")
            sys.exit(1)

        # Get the button
        add_btn = page.locator("#addCart_btn")

        # Click Add to Cart
        print("Clicking Add to Cart...")

        # Verify NO redirect happens and text changes
        # We can't strictly "expect no navigation" easily without waiting,
        # so we check the text change immediately.
        add_btn.click()

        # Check for immediate text change
        try:
            # wait for text to become "Added to Cart!"
            page.wait_for_function(
                "document.querySelector('#addCart_btn').textContent === 'Added to Cart!'",
                timeout=1000
            )
            print("Button text changed to 'Added to Cart!' successfully.")
        except Exception as e:
            print(f"Error: Button text did not change. Current text: {add_btn.inner_text()}")
            sys.exit(1)

        # Verify we are still on the same page (URL check)
        if "cart.html" in page.url:
            print("Error: Redirected to cart.html! UX improvement failed.")
            sys.exit(1)
        else:
             print("Stayed on product page. Good.")

        # Take a screenshot of the feedback state
        page.screenshot(path="verification/ux_feedback.png")

        # Wait for revert (2 seconds + buffer)
        print("Waiting for revert...")
        time.sleep(2.5)

        # Check text reverted
        current_text = add_btn.inner_text()
        if current_text != "Add to Cart":
            print(f"Error: Button text did not revert. Current text: {current_text}")
            sys.exit(1)
        else:
            print("Button text reverted successfully.")

        print("Verification Successful!")
        browser.close()

if __name__ == "__main__":
    verify_ux()
