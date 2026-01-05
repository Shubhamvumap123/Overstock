from playwright.sync_api import sync_playwright

def verify_buttons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # Wait for the trending div to be visible
        page.wait_for_selector("#trendingdiv")

        # Check if buttons are present
        buttons = page.locator("#trendingdiv button")
        count = buttons.count()
        print(f"Found {count} buttons in trending div")

        if count != 12:
            print(f"Expected 12 buttons, found {count}")
            # print inner html to debug
            print(page.locator("#trendingdiv").inner_html())

        # Hover over the first button to check hover state
        first_button = buttons.first
        first_button.hover()

        # Take a screenshot
        page.screenshot(path="verification/trending_buttons.png")

        browser.close()

if __name__ == "__main__":
    verify_buttons()
