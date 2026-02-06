from playwright.sync_api import sync_playwright, expect
import json
import time

def verify_product_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock the API response
        page.route("**/products/*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({
                "id": 1,
                "name": "Test Sofa",
                "price": 500,
                "rating": 4.5,
                "imageURL": "https://via.placeholder.com/400",
                "img1": "https://via.placeholder.com/100",
                "img2": "https://via.placeholder.com/100",
                "img3": "https://via.placeholder.com/100",
                "img4": "https://via.placeholder.com/100"
            })
        ))

        # Mock localStorage for selected_id
        page.add_init_script("""
            localStorage.setItem('selected_id', '1');
        """)

        print("Navigating to product page...")
        page.goto("http://localhost:8000/productPage.html")

        # Wait for buttons
        add_btn = page.locator("#addCart_btn")
        try:
            add_btn.wait_for(timeout=5000)
        except:
            print("Timeout waiting for Add to Cart button.")
            exit(1)

        fav_btn = page.locator("#addCart_btn1")

        # Test 1: Favorites Feedback
        print("Testing Favorites button...")

        # Ensure NO dialog
        dialog_triggered = False
        def handle_dialog(dialog):
            nonlocal dialog_triggered
            print(f"Dialog triggered: {dialog.message}")
            dialog_triggered = True
            dialog.accept()

        page.on("dialog", handle_dialog)

        fav_btn.click()

        # Verify text change to "Saved!"
        try:
            expect(fav_btn).to_have_text("Saved!")
            print("SUCCESS: Favorites button text changed to 'Saved!'.")
        except:
             print("FAILURE: Favorites button text did not change.")

        # Verify disabled
        if fav_btn.is_disabled():
            print("SUCCESS: Favorites button disabled.")
        else:
             print("FAILURE: Favorites button not disabled.")

        # Verify no dialog
        if not dialog_triggered:
            print("SUCCESS: No alert triggered.")
        else:
            print("FAILURE: Alert was triggered.")

        # Test 2: Add to Cart Feedback (No Redirect)
        print("Testing Add to Cart button...")

        add_btn.click()

        # Verify text change to "Added!"
        try:
            expect(add_btn).to_have_text("Added!")
            print("SUCCESS: Add to Cart button text changed to 'Added!'.")
        except:
             print("FAILURE: Add to Cart button text did not change.")

        # Verify disabled
        if add_btn.is_disabled():
             print("SUCCESS: Add to Cart button disabled.")
        else:
             print("FAILURE: Add to Cart button not disabled.")

        # Verify NO redirect (we should still be on the same page or URL shouldn't include cart.html)
        time.sleep(1) # Wait a bit to ensure no redirect happens
        if "cart.html" not in page.url:
            print("SUCCESS: Did not redirect to cart.html.")
        else:
            print("FAILURE: Redirected to cart.html.")

        # Take screenshot
        page.screenshot(path="verification_product_ux.png")
        print("Screenshot saved to verification_product_ux.png")

        browser.close()

if __name__ == "__main__":
    verify_product_ux()
