from playwright.sync_api import sync_playwright
import time
import json
import os
import subprocess

# Mock data
mock_res = {
    "_id": "123",
    "imageURL": "https://via.placeholder.com/150",
    "name": "Test Product 1",
    "price": 100,
    "rating": 4.5,
    "img1": "https://via.placeholder.com/150",
    "img2": "https://via.placeholder.com/150",
    "img3": "https://via.placeholder.com/150",
    "img4": "https://via.placeholder.com/150"
}

def run_server():
    # Start a simple HTTP server in the background
    p = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2) # Wait for server to start
    return p

def verify_ux():
    server_process = run_server()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Mock API call
            def handle_request(route, request):
                if "products/123" in request.url:
                    route.fulfill(
                        status=200,
                        content_type="application/json",
                        body=json.dumps(mock_res)
                    )
                else:
                    route.continue_()

            page.route("**/*", handle_request)

            # Navigate to product page
            target_url = "http://localhost:8000/productPage.html?id=123"
            page.goto(target_url)

            # Wait for button to appear
            add_cart_btn = page.locator("#addCart_btn")
            add_cart_btn.wait_for()

            print("ℹ️ Clicking 'Add to Cart' button...")

            # Click the button
            add_cart_btn.click()

            # Check 1: Verify NO redirect occurred (Wait a bit to be sure)
            time.sleep(1)
            current_url = page.url
            if current_url == target_url:
                print(f"✅ Verified: Page stayed on {current_url} (No Redirect).")
            else:
                print(f"❌ Failed: Page redirected to {current_url}.")
                exit(1)

            # Check 2: Verify visual feedback (Button text change)
            btn_text = add_cart_btn.inner_text()
            if "Added to Cart!" in btn_text:
                print(f"✅ Verified: Button text changed to '{btn_text}'.")
            else:
                print(f"❌ Failed: Button text is '{btn_text}', expected 'Added to Cart!'.")
                exit(1)

            # Check 3: Verify button is disabled
            if add_cart_btn.is_disabled():
                print("✅ Verified: Button is temporarily disabled.")
            else:
                 print("❌ Failed: Button is not disabled.")
                 exit(1)

            # Take screenshot of feedback
            page.screenshot(path="verification/add_to_cart_feedback.png")
            print("📸 Screenshot saved to verification/add_to_cart_feedback.png")

            # Check 4: Verify text reverts after 2 seconds
            print("ℹ️ Waiting for feedback to revert...")
            time.sleep(2.5)
            btn_text_reverted = add_cart_btn.inner_text()
            if btn_text_reverted == "Add to Cart":
                print("✅ Verified: Button text reverted to original.")
            else:
                print(f"❌ Failed: Button text did not revert, it is '{btn_text_reverted}'.")
                exit(1)

            print("🎉 Success: All UX checks passed!")
            browser.close()

    except Exception as e:
        print(f"❌ Verification failed: {e}")
        exit(1)
    finally:
        server_process.terminate()

if __name__ == "__main__":
    verify_ux()
