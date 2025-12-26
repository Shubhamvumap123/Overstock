from playwright.sync_api import sync_playwright

def verify_dropdowns():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the page served by python http.server
        page.goto("http://localhost:3000/livingRoom.html")

        # Click the "Categories" button (myFunction)
        page.click("#myFunction")
        # Check if dropdown content is visible
        is_visible = page.is_visible("#myDropdown")
        print(f"Categories dropdown visible: {is_visible}")
        if is_visible:
            page.screenshot(path="verification/dropdown_open.png")

        # Click the "Styles" button (myFunction3) which was bugged before (btn9-14 were opening it)
        # We need to click "Sizes" (myFunction9) and verify "Sizes" dropdown (myDropdown9) opens
        # and "Categories" (myDropdown) closes.

        page.click("#myFunction9")

        # Verify myDropdown9 is visible
        is_sizes_visible = page.is_visible("#myDropdown9")
        print(f"Sizes dropdown visible: {is_sizes_visible}")

        # Verify myDropdown3 (Styles) is NOT visible (it should be closed because we clicked a button?)
        # Actually my code does NOT close other dropdowns when clicking a button, unless we click outside.
        # Wait, the requirement was "clicking a button toggles it".
        # The "window.onclick" closes dropdowns if we click outside.
        # If I click Button A, then Button B. Both might be open.
        # Let verify this behavior.

        is_categories_visible = page.is_visible("#myDropdown")
        print(f"Categories dropdown still visible: {is_categories_visible}")

        page.screenshot(path="verification/dropdown_sizes.png")

        # Click outside (on body)
        page.mouse.click(0, 0)

        # Verify all closed
        is_categories_visible_after = page.is_visible("#myDropdown")
        is_sizes_visible_after = page.is_visible("#myDropdown9")
        print(f"Categories after outside click: {is_categories_visible_after}")
        print(f"Sizes after outside click: {is_sizes_visible_after}")

        page.screenshot(path="verification/dropdown_closed.png")

        browser.close()

if __name__ == "__main__":
    verify_dropdowns()
