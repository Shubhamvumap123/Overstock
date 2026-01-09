
from playwright.sync_api import sync_playwright

def verify_checkbox(page):
    # Navigate to the signup page
    page.goto("http://localhost:3000/signup.html")

    # Locate the checkbox label
    label = page.locator("label[for='checkbox']")

    # Verify the label contains the text
    text_content = label.text_content()
    print(f"Label text content: {text_content}")

    if "Sign up today for" not in text_content:
        raise Exception("Label text not found inside the label element!")

    # Verify the label is visible
    if not label.is_visible():
        raise Exception("Label is not visible!")

    # Take a screenshot
    page.screenshot(path="verification/checkbox_verification.png")
    print("Screenshot taken at verification/checkbox_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_checkbox(page)
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
