from playwright.sync_api import sync_playwright

def verify_living_room(page):
    # Navigate to the livingRoom.html page
    # Since we are running a python http server on port 3000
    page.goto("http://localhost:3000/livingRoom.html")

    # Wait for the page to load
    page.wait_for_load_state("networkidle")

    # Verify that the "Living Room Furniture" heading is visible
    heading = page.query_selector("#heading")
    if heading:
        print("Heading found:", heading.inner_text())
    else:
        print("Heading not found")

    # Verify that the "Products" list is empty (as expected with API down)
    # But more importantly, the page should be responsive and dropdowns should work.

    # Click a dropdown to ensure event listeners are attached
    dropdown_btn = page.query_selector("#myFunction")
    if dropdown_btn:
        print("Clicking dropdown button...")
        dropdown_btn.click()
        # Check if dropdown content is visible
        dropdown_content = page.query_selector("#myDropdown")
        is_visible = dropdown_content.is_visible()
        print(f"Dropdown visible: {is_visible}")

        if is_visible:
            print("Dropdown works! Event listeners are attached.")
        else:
            print("Dropdown failed to open.")
    else:
        print("Dropdown button not found")

    # Take a screenshot
    page.screenshot(path="verification/living_room_verification.png")
    print("Screenshot saved to verification/living_room_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_living_room(page)
        browser.close()
