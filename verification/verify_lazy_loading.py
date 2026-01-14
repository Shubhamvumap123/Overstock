from playwright.sync_api import sync_playwright

def verify_lazy_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Loading local file
        import os
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Check if images have loading="lazy"
        # We check one below the fold image

        # Using a selector for one of the images we modified, e.g., in banner two
        # Line 50 in index.html was modified. It's inside #bannertwo > a > div > img

        # Let's select images in #bannertwo
        images = page.locator("#bannertwo img").all()

        print(f"Found {len(images)} images in #bannertwo")

        for i, img in enumerate(images):
            loading_attr = img.get_attribute("loading")
            decoding_attr = img.get_attribute("decoding")
            print(f"Image {i}: loading={loading_attr}, decoding={decoding_attr}")
            if loading_attr != "lazy":
                print(f"FAILURE: Image {i} missing loading='lazy'")
            if decoding_attr != "async":
                print(f"FAILURE: Image {i} missing decoding='async'")

        # Also check a dynamically created image if possible, but index.html is static.
        # The dynamic ones are in scripts/main.js which are used in livingRoom.html

        page.screenshot(path="verification/lazy_loading.png")
        browser.close()

if __name__ == "__main__":
    verify_lazy_loading()
