import json
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to cart page
        page.goto("http://localhost:8000/cart.html")

        # Seed localStorage with a dummy item
        mock_cart = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Product",
                "price": "1000",
                "rating": 4.5
            }
        ]

        # Inject data
        json_cart = json.dumps(mock_cart)
        page.evaluate(f"localStorage.setItem('cartItems', '{json_cart}')")

        # Reload to render items
        page.reload()

        # Wait for items to render
        page.wait_for_selector(".remove-btn")

        # Verify structure
        remove_btn = page.locator(".remove-btn").first

        # Check aria-label
        aria_label = remove_btn.get_attribute("aria-label")
        print(f"Aria Label: {aria_label}")

        # Check tag name
        tag_name = remove_btn.evaluate("element => element.tagName")
        print(f"Tag Name: {tag_name}")

        # Take screenshot
        page.screenshot(path="verification/cart_a11y.png")

        browser.close()

if __name__ == "__main__":
    run()
