from playwright.sync_api import sync_playwright
import json
import time

def verify_product_ux():
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

        # Match the API URL used in productPage.html
        # It uses http://localhost:5000/products/${selected_id}
        page.route("**/products/*", handle_route)

        # Navigate to product page
        page.goto("http://localhost:8000/productPage.html?id=123")

        # Wait for content to load
        try:
            page.wait_for_selector("#addCart_btn", timeout=5000)
        except:
            print("Timeout waiting for content to load")
            print(page.content())
            browser.close()
            exit(1)

        # 1. Verify Alt Text
        main_img = page.locator("#post1")
        alt_text = main_img.get_attribute("alt")
        print(f"Main Image Alt: {alt_text}")
        if alt_text != "Test Sofa":
            print("FAILED: Main image alt text incorrect")
            exit(1)

        thumbnails = page.locator("#choice img").all()
        for i, thumb in enumerate(thumbnails):
            t_alt = thumb.get_attribute("alt")
            print(f"Thumbnail {i+1} Alt: {t_alt}")
            if t_alt != f"Product view {i+1}":
                print(f"FAILED: Thumbnail {i+1} alt text incorrect")
                exit(1)

        # 2. Verify Lazy Loading
        loading = main_img.get_attribute("loading")
        if loading != "lazy":
            print("FAILED: Main image missing loading='lazy'")
            exit(1)

        # 3. Verify Add to Cart Interaction
        add_btn = page.locator("#addCart_btn")

        # Click button
        add_btn.click()

        # Check for immediate feedback
        txt = add_btn.text_content()
        print(f"Button text after click: {txt}")

        if txt != "Added!":
            print("FAILED: Button text did not change to 'Added!'")
            exit(1)

        if not add_btn.is_disabled():
            print("FAILED: Button not disabled")
            exit(1)

        # Check URL (ensure no redirect)
        if "cart.html" in page.url:
            print("FAILED: Redirected to cart.html")
            exit(1)

        # Wait for revert
        print("Waiting for revert...")
        time.sleep(2.5)

        txt_revert = add_btn.text_content()
        print(f"Button text after wait: {txt_revert}")

        if txt_revert != "Add to Cart":
            print("FAILED: Button text did not revert")
            exit(1)

        if add_btn.is_disabled():
            print("FAILED: Button still disabled")
            exit(1)

        print("SUCCESS: All UX checks passed")
        browser.close()

if __name__ == "__main__":
    verify_product_ux()
