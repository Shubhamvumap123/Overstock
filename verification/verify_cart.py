from playwright.sync_api import sync_playwright

def verify_cart_remove_button():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Mock localStorage with a sample cart item
        cart_item = {
            "imageURL": "https://i.postimg.cc/tg7z1Kz4/Warrenton-Boho-Handcrafted-2-Door-Acacia-Wood-Sideboard-by-Christopher-Knight-Home.jpg",
            "name": "Test Product",
            "price": "100"
        }

        # Go to cart page
        # Using file protocol needs full path
        import os
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/cart.html")

        # Inject local storage
        page.evaluate(f"""() => {{
            localStorage.setItem("cartItems", JSON.stringify([{cart_item}]));
        }}""")

        # Reload to render content
        page.reload()

        # Check for the remove button
        # It should be a button now, not u tag
        remove_btn = page.locator(".remove-btn")

        # Wait for it to be visible
        remove_btn.wait_for()

        # Check attributes
        tag_name = remove_btn.evaluate("el => el.tagName")
        print(f"Tag name: {tag_name}")

        aria_label = remove_btn.get_attribute("aria-label")
        print(f"Aria label: {aria_label}")

        # Check styles (optional, but good for verification)
        bg = remove_btn.evaluate("el => window.getComputedStyle(el).background")
        print(f"Background: {bg}")

        # Screenshot
        page.screenshot(path="verification/cart_verification.png")
        print("Screenshot saved to verification/cart_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_cart_remove_button()
