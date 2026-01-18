from playwright.sync_api import sync_playwright
import json

def verify_lazy_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock localStorage data
        mock_data = [
            {
                "imgUrl": "https://via.placeholder.com/150",
                "name": "Test Item 1",
                "price": 100,
                "rating": 4.5
            },
             {
                "imgUrl": "https://via.placeholder.com/150",
                "name": "Test Item 2",
                "price": 200,
                "rating": 3.5
            }
        ]

        # We need to set localStorage BEFORE the script runs.
        # Since we can't easily do that before page load for the initial run without init_script,
        # we'll use add_init_script.

        page.add_init_script(f"""
            localStorage.setItem('category', JSON.stringify({json.dumps(mock_data)}));
        """)

        # Navigate to page
        page.goto("http://localhost:3000/livingRoom.html")

        # Wait for images to appear (using the id assigned in main.js, which is duplicated but usable for selection)
        # Note: duplicate IDs are bad, but that's what the code produces. Playwright handles it by selecting first or all.
        try:
            page.wait_for_selector("#poster", timeout=5000)
        except:
            print("Timeout waiting for #poster. Page content:")
            print(page.content())
            browser.close()
            exit(1)

        # Check attributes
        # locator("#poster") matches all elements with id="poster" if using .all()
        images = page.locator("#poster").all()
        print(f"Found {len(images)} images")

        if len(images) == 0:
             print("No images found with id poster")
             exit(1)

        for i, img in enumerate(images):
            loading = img.get_attribute("loading")
            decoding = img.get_attribute("decoding")
            print(f"Image {i}: loading={loading}, decoding={decoding}")
            if loading != "lazy":
                print(f"FAILED: Image {i} missing loading='lazy'")
                exit(1)
            if decoding != "async":
                 print(f"FAILED: Image {i} missing decoding='async'")
                 exit(1)

        print("SUCCESS: All images have correct attributes")

        page.screenshot(path="verification_lazy.png")
        browser.close()

if __name__ == "__main__":
    verify_lazy_loading()
