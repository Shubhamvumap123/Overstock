from playwright.sync_api import sync_playwright

def verify_cart_optimization():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock localStorage data to ensure cart has items
        page.add_init_script("""
            localStorage.setItem('cartItems', JSON.stringify([
                {
                    name: 'Test Furniture',
                    price: '5000',
                    imageURL: 'https://via.placeholder.com/150'
                },
                {
                    name: 'Another Item',
                    price: '2500',
                    imageURL: 'https://via.placeholder.com/150'
                }
            ]));
        """)

        # We need to serve the file. Since we don't have a server running, we can try to use file:// protocol if allowed,
        # but modern browsers often block local file access for some operations.
        # Ideally, we should start a simple python server.

        # Let's assume we are running a server on port 3000
        page.goto("http://localhost:3000/cart.html")

        # Wait for the elements to be rendered
        page.wait_for_selector("#left > div")

        # Take a screenshot
        page.screenshot(path="verification/cart_verification.png")

        # Verify that 2 items are rendered
        items = page.query_selector_all("#left > div")
        print(f"Number of items rendered: {len(items)}")

        if len(items) == 2:
            print("Verification Successful: 2 items rendered correctly.")
        else:
            print(f"Verification Failed: Expected 2 items, found {len(items)}.")

        browser.close()

if __name__ == "__main__":
    verify_cart_optimization()
