import time
from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os
import sys

PORT = 8004

def run_server():
    # Serve from the root of the repo
    os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/../")
    Handler = http.server.SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"serving at port {PORT}")
        httpd.serve_forever()

def verify_ux():
    # Create temporary harness
    harness_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UX Test Harness</title>
</head>
<body>
    <div id="main1"></div>
    <script type="module">
        import { appendArticles } from "./scripts/productPage.js";

        const mockArticle = {
            imageURL: "https://via.placeholder.com/150",
            name: "Test Product",
            rating: 4.5,
            price: 1000,
            img1: "https://via.placeholder.com/50",
            img2: "https://via.placeholder.com/50",
            img3: "https://via.placeholder.com/50",
            img4: "https://via.placeholder.com/50"
        };

        const parent = document.getElementById("main1");
        appendArticles(mockArticle, parent);
    </script>
</body>
</html>
    """
    repo_root = os.path.dirname(os.path.abspath(__file__)) + "/../"
    harness_path = os.path.join(repo_root, "test_ux_harness.html")

    with open(harness_path, "w") as f:
        f.write(harness_content)

    try:
        # Start server in background
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        time.sleep(2) # Give server time to start

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Navigate to test harness
            page.goto(f"http://localhost:{PORT}/test_ux_harness.html")

            # Wait for elements to render
            page.wait_for_selector("#addCart_btn")

            # Test 1: Add to Cart UX
            print("Testing 'Add to Cart' button...")
            add_btn = page.locator("#addCart_btn")

            # Click and check for redirect (we want NO redirect)
            # We can check URL after a short delay
            original_url = page.url
            add_btn.click()
            time.sleep(1) # Wait a bit to see if redirect happens

            if page.url != original_url:
                print(f"FAILURE: Button redirected to {page.url}")
                sys.exit(1)
            else:
                print("SUCCESS: Button did not redirect.")

            # Check for text change
            btn_text = add_btn.inner_text()
            if "Added" not in btn_text:
                print(f"FAILURE: Button text did not change to indicate success. Current text: '{btn_text}'")
                sys.exit(1)
            else:
                print(f"SUCCESS: Button text changed to '{btn_text}'")

            # Test 2: Favorites UX
            print("Testing 'Favorites' button...")
            fav_btn = page.locator("#addCart_btn1")

            # Listen for dialogs (alerts)
            dialog_appeared = False
            def handle_dialog(dialog):
                nonlocal dialog_appeared
                dialog_appeared = True
                print(f"Alert detected: {dialog.message}")
                dialog.dismiss()

            page.on("dialog", handle_dialog)

            fav_btn.click()
            time.sleep(0.5)

            if dialog_appeared:
                print("FAILURE: Alert dialog appeared (should be suppressed).")
                sys.exit(1)
            else:
                print("SUCCESS: No alert dialog appeared.")

            # Check for text change
            fav_text = fav_btn.inner_text()
            if "Saved" not in fav_text:
                print(f"FAILURE: Button text did not change to indicate success. Current text: '{fav_text}'")
                sys.exit(1)
            else:
                print(f"SUCCESS: Button text changed to '{fav_text}'")

            print("ALL UX TESTS PASSED!")
            browser.close()
    finally:
        if os.path.exists(harness_path):
            os.remove(harness_path)

if __name__ == "__main__":
    verify_ux()
