from playwright.sync_api import sync_playwright

def verify_button_conversion():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:3000/index.html")

        # Check if the buttons in #bannertwo exist and are visible
        buttons = page.locator("#bannertwo > button")
        count = buttons.count()
        print(f"Found {count} buttons in #bannertwo")

        if count == 0:
            print("Error: No buttons found in #bannertwo")
            browser.close()
            return

        # Take a screenshot of the banner
        banner = page.locator("#bannertwo")
        banner.screenshot(path="verification/bannertwo_buttons.png")

        # Also verification that they are indeed buttons
        for i in range(count):
            tag_name = buttons.nth(i).evaluate("el => el.tagName")
            print(f"Element {i} tag name: {tag_name}")

        browser.close()

if __name__ == "__main__":
    verify_button_conversion()
