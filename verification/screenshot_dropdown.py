from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to page
        page.goto("http://localhost:3000/index.html")

        # Wait for navbar to be populated
        page.wait_for_selector(".header")

        trigger = page.locator(".section-div > div").first

        # Hover to show dropdown
        trigger.hover()
        time.sleep(1) # wait for render

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        path = os.path.abspath("verification/dropdown_visible.png")
        page.screenshot(path=path)
        print(f"Screenshot taken: {path}")

        browser.close()

if __name__ == "__main__":
    run()
