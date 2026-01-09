from playwright.sync_api import sync_playwright

def verify_lazy_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local index.html file
        page.goto("file:///app/index.html")

        # Check specific images for lazy loading attribute
        # We need to find images inside .carousel, #bannerthird, etc.

        # 1. Carousel images
        carousel_imgs = page.locator('.carousel img')
        count = carousel_imgs.count()
        print(f"Found {count} carousel images")

        for i in range(count):
            img = carousel_imgs.nth(i)
            loading = img.get_attribute('loading')
            decoding = img.get_attribute('decoding')

            if loading != 'lazy' or decoding != 'async':
                print(f"FAIL: Carousel image {i} missing attributes. Loading: {loading}, Decoding: {decoding}")
            else:
                pass # print(f"PASS: Carousel image {i} is lazy")

        # 2. Check a banner image (e.g. #bannerthird)
        banner3_img = page.locator('#bannerthird img').first
        if banner3_img.get_attribute('loading') == 'lazy' and banner3_img.get_attribute('decoding') == 'async':
            print("PASS: #bannerthird image is lazy")
        else:
            print(f"FAIL: #bannerthird image missing attributes. Loading: {banner3_img.get_attribute('loading')}")

        # 3. Check eager images (should NOT be lazy)
        hero_img = page.locator('#bannerfirst img').first
        if hero_img.get_attribute('loading') is None:
             print("PASS: Hero image is eager (no loading attribute)")
        else:
             print(f"FAIL: Hero image has loading attribute: {hero_img.get_attribute('loading')}")

        # Take a screenshot just to satisfy the verification requirement,
        # though this is mostly a code attribute check.
        page.screenshot(path="verification/lazy_loading_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_lazy_loading()
