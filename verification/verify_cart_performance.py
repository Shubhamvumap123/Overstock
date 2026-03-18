from playwright.sync_api import sync_playwright
import json
import os

def verify_cart_performance():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock cart data
        mock_cart = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Performance Test Item",
                "price": 999
            }
        ]

        # Inject data into localStorage
        page.add_init_script(f"""
            localStorage.setItem('cartItems', JSON.stringify({json.dumps(mock_cart)}));
        """)

        page.goto("http://localhost:8000/cart.html")

        # Wait for content to appear
        try:
            page.wait_for_selector(".item-name", timeout=5000)
        except:
             print("Timeout waiting for .item-name. Cart might be empty or error.")
             print(page.content())
             browser.close()
             exit(1)

        # Verify content text
        name_text = page.locator(".item-name").first.text_content()
        if "Performance Test Item" not in name_text:
             print(f"FAILED: Name mismatch. Expected 'Performance Test Item', got '{name_text}'")
             exit(1)

        price_text = page.locator("#left h2").first.text_content()
        if "999" not in price_text:
             print(f"FAILED: Price mismatch. Expected '999' in '{price_text}'")
             exit(1)

        print("SUCCESS: Cart verified with current implementation.")

        # Take screenshot for verification
        screenshot_path = "verification/cart_performance.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_cart_performance()
