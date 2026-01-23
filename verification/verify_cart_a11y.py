from playwright.sync_api import sync_playwright
import json

def verify_cart_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock localStorage data
        mock_data = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Accessible Sofa",
                "price": 5000
            },
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Ergonomic Chair",
                "price": 3000
            }
        ]

        # Inject data into localStorage
        page.add_init_script(f"""
            localStorage.setItem('cartItems', JSON.stringify({json.dumps(mock_data)}));
        """)

        # Navigate to cart page
        # Assuming localhost:8000 because I will start the server on that port
        page.goto("http://localhost:8000/cart.html")

        # Wait for content to render
        try:
            page.wait_for_selector(".remove-btn", timeout=5000)
        except:
             print("Timeout waiting for .remove-btn. Check if cart.js is loading and rendering.")
             print(page.content())
             browser.close()
             exit(1)

        # Verify buttons
        buttons = page.locator(".remove-btn").all()
        print(f"Found {len(buttons)} remove buttons")

        if len(buttons) != 2:
            print("FAILED: Expected 2 remove buttons")
            exit(1)

        for i, btn in enumerate(buttons):
            # Check tag name
            tag_name = btn.evaluate("el => el.tagName")
            print(f"Button {i} tag: {tag_name}")
            if tag_name != "BUTTON":
                 print(f"FAILED: Button {i} is not a <button> tag (found {tag_name})")
                 exit(1)

            # Check ARIA label
            aria_label = btn.get_attribute("aria-label")
            print(f"Button {i} aria-label: {aria_label}")
            expected_label = f"Remove {mock_data[i]['name']} from cart"
            if aria_label != expected_label:
                 print(f"FAILED: Button {i} has incorrect aria-label (expected '{expected_label}', found '{aria_label}')")
                 exit(1)

        # Verify no duplicate IDs for name
        names_ids = page.locator("#name").count()
        if names_ids > 0:
             print(f"FAILED: Found {names_ids} elements with id='name'. Should be classes.")
             exit(1)

        # Verify no duplicate IDs for remove
        remove_ids = page.locator("#remove").count()
        if remove_ids > 0:
             print(f"FAILED: Found {remove_ids} elements with id='remove'. Should be classes.")
             exit(1)

        print("SUCCESS: Cart accessibility verification passed")
        page.screenshot(path="verification_cart_a11y.png")
        browser.close()

if __name__ == "__main__":
    verify_cart_a11y()
