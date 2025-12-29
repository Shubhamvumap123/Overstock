
from playwright.sync_api import sync_playwright, expect

def verify_trending_buttons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:3000/index.html")

        # Locate the trendingdiv
        trending_div = page.locator("#trendingdiv")

        # Check if buttons are present
        buttons = trending_div.locator("button")
        count = buttons.count()
        print(f"Found {count} buttons in #trendingdiv")

        if count == 0:
            print("Error: No buttons found!")
            browser.close()
            return

        # Check the text of the first button
        first_button = buttons.first
        print(f"First button text: {first_button.inner_text()}")
        expect(first_button).to_have_text("Home Office Furniture")

        # Focus the first button to verify focusability
        first_button.focus()

        # Take a screenshot
        page.screenshot(path="verification/trending_buttons.png")
        print("Screenshot saved to verification/trending_buttons.png")

        browser.close()

if __name__ == "__main__":
    verify_trending_buttons()
