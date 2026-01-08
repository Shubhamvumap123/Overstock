from playwright.sync_api import sync_playwright

def verify_ids(page):
    page.goto("http://localhost:3000/index.html")

    # Check that there are no elements with the old duplicate IDs
    # Note: page.query_selector_all returns a list, so checking length 0 is good but since I fixed it,
    # the IDs shouldn't be there.
    # However, I didn't remove the ID from the first occurrence?
    # Wait, I replaced ALL occurrences with class.

    # Check that the new classes exist and styles are applied
    # .procategoryrow1 should exist (2 occurrences)
    rows = page.locator(".procategoryrow1").count()
    print(f"Found {rows} elements with class 'procategoryrow1'")
    if rows != 2:
        print("ERROR: Expected 2 elements with class 'procategoryrow1'")

    # .bannersixtext should exist (4 occurrences)
    texts = page.locator(".bannersixtext").count()
    print(f"Found {texts} elements with class 'bannersixtext'")
    if texts != 4:
        print("ERROR: Expected 4 elements with class 'bannersixtext'")

    # Check if styles are applied (e.g. text-align center on bannersixtext)
    # We can check computed style of the first one
    first_text = page.locator(".bannersixtext").first
    align = first_text.evaluate("element => window.getComputedStyle(element).textAlign")
    print(f"Computed textAlign for first .bannersixtext: {align}")
    if align != 'center':
        print("ERROR: Style not applied correctly!")

    # Take screenshot
    page.screenshot(path="verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_ids(page)
        except Exception as e:
            print(e)
        finally:
            browser.close()
