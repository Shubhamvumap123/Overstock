from playwright.sync_api import sync_playwright

def verify_lazy_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # Select images that should have lazy loading
        # We expect many images to have loading="lazy"
        # Let's check a few specific ones we modified

        # Image in #bannertwo
        img1 = page.locator("#bannertwo img").first
        loading_attr = img1.get_attribute("loading")
        decoding_attr = img1.get_attribute("decoding")

        print(f"Image 1 loading: {loading_attr}, decoding: {decoding_attr}")

        if loading_attr != "lazy" or decoding_attr != "async":
            print("FAILED: Image 1 missing attributes")
            # browser.close()
            # return

        # Image in carousel
        img2 = page.locator(".carousel-cell img").first
        loading_attr2 = img2.get_attribute("loading")
        decoding_attr2 = img2.get_attribute("decoding")

        print(f"Image 2 loading: {loading_attr2}, decoding: {decoding_attr2}")

        if loading_attr2 != "lazy" or decoding_attr2 != "async":
            print("FAILED: Image 2 missing attributes")

        # Take a screenshot to verify layout didn't break
        page.screenshot(path="verification/index_lazy_load.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_lazy_loading()
