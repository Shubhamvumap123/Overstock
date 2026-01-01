from playwright.sync_api import sync_playwright

def verify_furniture_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the furniture page
        page.goto("http://localhost:3000/furniture.html")

        # Wait for content to render.
        # Since we removed the blocking call, it should render immediately.
        # We check for the presence of items in #main which come from localStorage
        page.wait_for_selector("#main div", timeout=5000)

        # Take a screenshot
        page.screenshot(path="verification/furniture_page.png")

        print("Verification successful: furniture_page.png created")
        browser.close()

if __name__ == "__main__":
    verify_furniture_page()