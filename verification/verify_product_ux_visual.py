from playwright.sync_api import sync_playwright
import json
import time

def verify_product_ux_visual():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock API response
        mock_product = {
            "name": "Test Sofa",
            "price": 999,
            "rating": 4.5,
            "imageURL": "https://via.placeholder.com/500",
            "img1": "https://via.placeholder.com/100",
            "img2": "https://via.placeholder.com/100",
            "img3": "https://via.placeholder.com/100",
            "img4": "https://via.placeholder.com/100"
        }

        # Intercept API calls
        def handle_route(route):
            route.fulfill(
                status=200,
                content_type="application/json",
                body=json.dumps(mock_product)
            )

        page.route("**/products/*", handle_route)

        # Navigate to product page
        page.goto("http://localhost:8000/productPage.html?id=123")

        # Wait for content
        page.wait_for_selector("#addCart_btn", timeout=5000)

        # Screenshot 1: Initial State
        page.screenshot(path="verification/product_initial.png")
        print("Screenshot taken: verification/product_initial.png")

        # Click button
        add_btn = page.locator("#addCart_btn")
        add_btn.click()

        # Verify "Added!" text
        txt = add_btn.text_content()
        if txt != "Added!":
             print(f"FAILED: Expected 'Added!', got '{txt}'")

        # Screenshot 2: Added State
        page.screenshot(path="verification/product_added.png")
        print("Screenshot taken: verification/product_added.png")

        # Wait for revert
        time.sleep(2.5)

        # Screenshot 3: Reverted State
        page.screenshot(path="verification/product_reverted.png")
        print("Screenshot taken: verification/product_reverted.png")

        browser.close()

if __name__ == "__main__":
    verify_product_ux_visual()
