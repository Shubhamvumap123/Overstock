from playwright.sync_api import sync_playwright

def verify_dropdowns():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/livingRoom.html")

        # Click Categories
        page.click("#myFunction")
        page.screenshot(path="verification/dropdown_1_open.png")
        print("Opened Categories")

        # Close Categories by clicking it again
        page.click("#myFunction")
        page.screenshot(path="verification/dropdown_1_closed.png")
        print("Closed Categories")

        # Click Sizes (myFunction9) - checking if my fix for the bug works
        # Scroll it into view just in case
        page.locator("#myFunction9").scroll_into_view_if_needed()
        page.click("#myFunction9")
        page.screenshot(path="verification/dropdown_9_open.png")

        # Verify myDropdown9 is visible
        is_visible = page.is_visible("#myDropdown9")
        print(f"Sizes dropdown visible: {is_visible}")

        # Verify myDropdown3 (Styles) is NOT visible (it used to be bugged)
        is_bug_visible = page.is_visible("#myDropdown3")
        print(f"Styles dropdown (bug check) visible: {is_bug_visible}")

        browser.close()

if __name__ == "__main__":
    verify_dropdowns()
