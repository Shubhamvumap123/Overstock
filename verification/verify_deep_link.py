from playwright.sync_api import sync_playwright
import time
import json
import os
import subprocess

# Mock data
mock_category = [
    {
        "imgUrl": "https://via.placeholder.com/150",
        "name": "Test Item 1",
        "rating": 4.5
    }
]

mock_res = [
    {
        "_id": "123",
        "imageURL": "https://via.placeholder.com/150",
        "name": "Test Product 1",
        "price": 100,
        "rating": 4.5
    }
]

def run_server():
    # Start a simple HTTP server in the background
    p = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2) # Wait for server to start
    return p

def verify_optimization():
    server_process = run_server()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Set localStorage before navigation
            # We need to navigate to the domain first to set localStorage
            page.goto("http://localhost:8000/livingRoom.html")

            page.evaluate(f"""() => {{
                localStorage.setItem('category', '{json.dumps(mock_category)}');
                localStorage.setItem('trending', '{json.dumps(mock_category)}');
                localStorage.setItem('ourstyle', '{json.dumps(mock_category)}');
                // We can't easily inject 'res' into livingRoom.js module scope
                // But we can test appendData behavior via the 'category' section
            }}""")

            page.reload()

            # Check appendData items (Category section)
            # Parent for category is #main
            # Verify if items are rendered
            item = page.locator("#main .div1").first
            if item.count() > 0:
                print("✅ Items rendered in Category section.")

                # Check if it is an anchor tag (Optimization check)
                tag_name = page.evaluate("document.querySelector('#main .div1').tagName")
                print(f"ℹ️ Item tag name: {tag_name}")

                if tag_name == "A":
                    print("✅ Optimization verified: Items are <a> tags.")
                    href = page.evaluate("document.querySelector('#main .div1').getAttribute('href')")
                    print(f"ℹ️ Link href: {href}")
                else:
                    print("⚠️ Optimization NOT applied: Items are not <a> tags.")

            else:
                print("❌ No items rendered in Category section.")

            # Now let's try to verify productPage.html id param support
            # We'll just navigate to productPage.html?id=123 and see if it tries to fetch
            # Since API is dead, it might fail, but we can check if it attempted to get ID from URL

            page.goto("http://localhost:8000/productPage.html?id=123")

            # We can check if the script tries to use '123'
            # We can intercept the console or network
            # Or we can check if it falls back to localStorage if we don't provide ID

            # Let's check if the ID is retrieved from URL by injecting a script to check variable
            # but we can't easily access module scope.
            # However, we can check if the API call was made with '123'

            # Intercept request
            request_made = False
            def handle_request(route, request):
                nonlocal request_made
                if "products/123" in request.url:
                    request_made = True
                    print(f"✅ Request made with ID from URL: {request.url}")
                    # Mock response
                    route.fulfill(
                        status=200,
                        content_type="application/json",
                        body=json.dumps(mock_res[0])
                    )
                else:
                    route.continue_()

            page.route("**/*", handle_request)

            page.goto("http://localhost:8000/productPage.html?id=123")
            time.sleep(1) # Wait for script to run

            if request_made:
                print("✅ Deep linking verified: productPage.html used ID from URL.")
            else:
                print("⚠️ Deep linking check: No request with ID 123 observed (might be expected if logic differs).")

            page.screenshot(path="verification/deep_link_verification.png")
            print("📸 Screenshot saved to verification/deep_link_verification.png")

            browser.close()
    finally:
        server_process.terminate()

if __name__ == "__main__":
    verify_optimization()
