from playwright.sync_api import sync_playwright

def verify_bannertwo():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # Verify the banner exists
        banner = page.locator("#bannertwo")
        if not banner.is_visible():
            print("Error: #bannertwo not found or not visible")
            browser.close()
            return

        # Check for anchors inside banner
        anchors = page.locator("#bannertwo > a")
        count = anchors.count()
        print(f"Found {count} anchors in #bannertwo")

        if count == 0:
            print("Error: No anchors found in #bannertwo")
        else:
            # Check the href of the first anchor
            first_anchor = anchors.nth(0)
            href = first_anchor.get_attribute("href")
            print(f"First anchor href: {href}")

            # Check visual style (computed style)
            # We can't easily check computed style in python without executing JS,
            # but the screenshot will show if it looks right.

            # Verify Living Room link
            living_room_link = page.locator("a[href='livingRoom.html']")
            if living_room_link.count() > 0:
                print("Found link to livingRoom.html")
            else:
                print("Error: Link to livingRoom.html not found")

        # Take screenshot
        page.screenshot(path="verification/bannertwo_after.png")
        print("Screenshot saved to verification/bannertwo_after.png")

        browser.close()

if __name__ == "__main__":
    verify_bannertwo()
