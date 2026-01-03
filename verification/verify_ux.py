
from playwright.sync_api import sync_playwright

def verify_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open index.html directly from file system
        # Assuming current working directory is repo root
        import os
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Wait for banner to be visible
        page.wait_for_selector("#bannertwo")

        # Take screenshot of the banner area
        element = page.locator("#bannertwo")
        element.screenshot(path="verification/bannertwo_links.png")

        browser.close()

if __name__ == "__main__":
    verify_ux()
