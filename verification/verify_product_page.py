from playwright.sync_api import sync_playwright

def verify_product_page_blocking():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Seed localStorage with a dummy selected_id
        # We need this because productPage.html reads it to construct the API URL
        page.add_init_script("""
            localStorage.setItem('selected_id', JSON.stringify('dummy_product_id'));
        """)

        # 2. Go to productPage.html
        # We use the local server because of module scripts
        try:
            page.goto("http://localhost:3000/productPage.html", timeout=10000)
        except Exception as e:
            print(f"Navigation error: {e}")

        # 3. Verification: Check if Navbar is visible
        # If the top-level await was blocking and API failed (which it will, because localhost:5000 is not running),
        # the navbar script would not execute.
        # With the fix, the navbar should appear immediately.

        try:
            # Wait for navbar to be populated. The navbar script sets innerHTML of #navbar
            # We expect to see "Sign In" or "Account" or generic navbar text.
            # Let's check for the presence of the navbar content.
            # navbar.js returns HTML string starting with <div id="container">...

            # Wait for the navbar to have some content
            page.wait_for_selector("#navbar div", timeout=5000)
            print("Navbar loaded successfully!")

            # Take screenshot
            page.screenshot(path="verification/product_page_unblocked.png")

        except Exception as e:
            print(f"Navbar failed to load: {e}")
            # Take screenshot of failure state
            page.screenshot(path="verification/product_page_failed.png")

        browser.close()

if __name__ == "__main__":
    verify_product_page_blocking()
