from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Since this is a static site, we can verify by loading the file directly
        # But we need to serve it to avoid cross-origin issues with modules if any
        # However, for this simple verification of button rendering, file:// might work or we start a server.
        # Let starts a python server in background

        page.goto("http://localhost:3000/index.html")

        # Check if the buttons in #bannertwo exist and are visible
        # bannertwo has buttons as direct children now

        buttons = page.locator("#bannertwo > button")
        count = buttons.count()
        print(f"Found {count} buttons in #bannertwo")

        if count == 0:
            print("No buttons found in #bannertwo!")
            exit(1)

        # Focus on the first button to check outline
        buttons.first.focus()

        page.screenshot(path="verification/bannertwo_buttons.png")
        print("Screenshot saved to verification/bannertwo_buttons.png")
        browser.close()

if __name__ == "__main__":
    run()
