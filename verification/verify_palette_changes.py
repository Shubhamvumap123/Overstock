
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify index.html changes
        print("Verifying index.html...")
        page.goto("http://localhost:3000/index.html")

        # Check flash sale link
        flash_link = page.locator("#flashsale")
        if flash_link.count() > 0:
            tag_name = flash_link.evaluate("el => el.tagName")
            href = flash_link.get_attribute("href")
            aria_label = flash_link.get_attribute("aria-label")
            print(f"Flash sale tag: {tag_name}")
            print(f"Flash sale href: {href}")
            print(f"Flash sale aria-label: {aria_label}")

            if tag_name == "A" and href == "#" and aria_label:
                print("SUCCESS: Flash sale is now an accessible link.")
            else:
                print("FAILURE: Flash sale attributes are incorrect.")
        else:
            print("FAILURE: Flash sale element not found.")

        page.screenshot(path="verification/index_flash_sale.png")

        # 2. Verify furniture.html changes
        print("\nVerifying furniture.html...")
        page.goto("http://localhost:3000/furniture.html")

        # Check furniture images links
        img1_link = page.locator(".furniture-Img1")
        if img1_link.count() > 0:
            tag_name = img1_link.evaluate("el => el.tagName")
            href = img1_link.get_attribute("href")
            print(f"Furniture Img1 tag: {tag_name}")
            print(f"Furniture Img1 href: {href}")

            if tag_name == "A" and "livingRoom.html" in href:
                print("SUCCESS: Furniture Img1 is now an anchor tag linking to livingRoom.html.")
            else:
                print("FAILURE: Furniture Img1 attributes are incorrect.")
        else:
             print("FAILURE: Furniture Img1 element not found.")

        # Check for nested button issue (should be gone)
        # We changed the button to a span with class readMore
        read_more_span = img1_link.locator(".readMore")
        if read_more_span.count() > 0:
            span_tag = read_more_span.evaluate("el => el.tagName")
            print(f"Read More element tag: {span_tag}")
            if span_tag == "SPAN":
                 print("SUCCESS: 'Shop Now' button is now a span.")
            else:
                 print("FAILURE: 'Shop Now' is not a span.")
        else:
            print("FAILURE: 'Shop Now' element not found.")

        page.screenshot(path="verification/furniture_links.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
