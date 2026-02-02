from playwright.sync_api import sync_playwright
import json
import time

def verify_add_to_cart_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock product data
        mock_product_id = "12345"
        mock_product = {
            "imageURL": "https://via.placeholder.com/150",
            "name": "Test Sofa",
            "price": 500,
            "rating": 4.5,
            "img1": "https://via.placeholder.com/150",
            "img2": "https://via.placeholder.com/150",
            "img3": "https://via.placeholder.com/150",
            "img4": "https://via.placeholder.com/150",
            "_id": mock_product_id
        }

        # Mock API
        page.route(f"**/products/{mock_product_id}", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps(mock_product)
        ))

        # Navigate with query param to trigger the script
        print(f"Navigating to http://localhost:8000/productPage.html?id={mock_product_id}")
        page.goto(f"http://localhost:8000/productPage.html?id={mock_product_id}")

        # Wait for content to load
        try:
            page.wait_for_selector("#addCart_btn", timeout=5000)
        except:
            print("Timeout waiting for #addCart_btn")
            # print(page.content())
            browser.close()
            exit(1)

        print("Page loaded successfully")

        # Click Add to Cart
        print("Clicking Add to Cart...")
        # Get current URL
        initial_url = page.url

        page.click("#addCart_btn")

        # Allow time for potential redirect or UI update
        # Wait less than 1s (the revert timeout) to catch the "Added!" state
        time.sleep(0.5)

        current_url = page.url
        print(f"Current URL: {current_url}")

        if "cart.html" in current_url:
            print("FAIL: Redirected to cart.html")
            browser.close()
            exit(1)

        if current_url.split('?')[0] != initial_url.split('?')[0]:
             print(f"FAIL: URL changed to {current_url}")
             browser.close()
             exit(1)

        # Check button text
        btn_text = page.locator("#addCart_btn").text_content()
        print(f"Button text: {btn_text}")

        if "Added" not in btn_text:
            print(f"FAIL: Button text did not change to 'Added!', got '{btn_text}'")
            browser.close()
            exit(1)

        print("SUCCESS: Stayed on page and updated button text")

        # Take screenshot
        page.screenshot(path="verification/add_to_cart_success.png")

        browser.close()

if __name__ == "__main__":
    verify_add_to_cart_ux()
