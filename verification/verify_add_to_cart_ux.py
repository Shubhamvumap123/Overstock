from playwright.sync_api import sync_playwright
import json
import time

def verify_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock Product Data
        mock_product = {
            "id": 1,
            "imageURL": "https://via.placeholder.com/150",
            "name": "Test Product",
            "rating": 4.5,
            "price": 100,
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

        # Set selected_id in localStorage so the page tries to load something
        page.add_init_script("""
            localStorage.setItem('selected_id', '1');
        """)

        # Navigate to page
        page.goto("http://localhost:3000/productPage.html")

        # Wait for "Add to Cart" button
        try:
            page.wait_for_selector("#addCart_btn", timeout=5000)
        except:
            print("Timeout waiting for #addCart_btn. Page content:")
            print(page.content())
            browser.close()
            exit(1)

        add_cart_btn = page.locator("#addCart_btn")
        fav_btn = page.locator("#addCart_btn1")

        # TEST 1: Add to Cart UX
        print("Testing 'Add to Cart'...")
        initial_url = page.url
        add_cart_btn.click()

        # Check if URL changed (it SHOULD NOT)
        # We need to wait a tiny bit to be sure no redirect happens
        page.wait_for_timeout(500)
        if page.url != initial_url:
            print(f"FAILED: Page redirected to {page.url}")
            exit(1)
        else:
            print("SUCCESS: Page did not redirect.")

        # Check button text change
        if "Added!" not in add_cart_btn.inner_text():
             print(f"FAILED: Button text did not change to 'Added!'. Got: {add_cart_btn.inner_text()}")
             exit(1)
        else:
             print("SUCCESS: Button text changed to 'Added!'")

        page.screenshot(path="verification/verification.png")

        # Wait for revert (2s + buffer)
        page.wait_for_timeout(2500)
        if "Add to Cart" not in add_cart_btn.inner_text():
             print(f"FAILED: Button text did not revert. Got: {add_cart_btn.inner_text()}")
             exit(1)
        else:
             print("SUCCESS: Button text reverted.")


        # TEST 2: Favorites UX
        print("Testing 'Favorites'...")

        # Monitor for alerts
        dialog_message = []
        page.on("dialog", lambda dialog: dialog_message.append(dialog.message) or dialog.accept())

        fav_btn.click()

        # Check if alert appeared (it SHOULD NOT)
        if len(dialog_message) > 0:
             print(f"FAILED: Alert appeared with message: {dialog_message[0]}")
             exit(1)
        else:
             print("SUCCESS: No alert appeared.")

        # Check button text change
        if "Saved!" not in fav_btn.inner_text():
             print(f"FAILED: Button text did not change to 'Saved!'. Got: {fav_btn.inner_text()}")
             exit(1)
        else:
             print("SUCCESS: Button text changed to 'Saved!'")

        browser.close()
        print("All UX tests passed!")

if __name__ == "__main__":
    verify_ux()
