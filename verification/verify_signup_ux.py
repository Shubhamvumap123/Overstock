from playwright.sync_api import sync_playwright
import sys
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000/signup.html")

            # Wait for content
            page.wait_for_selector(".checkboxDiv")

            # 1. Check Checkbox UX
            checkbox = page.locator("#checkbox")
            label = page.locator("label[for='checkbox']")

            # Check if label contains the text
            text_snippet = "Sign up today for"
            label_text = label.text_content()

            print(f"Label text: '{label_text.strip()}'")

            label_has_text = text_snippet in label_text
            if not label_has_text:
                print("FAIL: Label does not contain the descriptive text.")
            else:
                print("PASS: Label contains descriptive text.")

            # Take screenshot of the checkbox area
            checkbox_div = page.locator(".checkboxDiv")
            if not os.path.exists("verification"):
                os.makedirs("verification")
            checkbox_div.screenshot(path="verification/signup_checkbox_ux.png")
            print("Screenshot saved to verification/signup_checkbox_ux.png")

            # Check if clicking label toggles checkbox
            # Reset checkbox if checked (it shouldn't be by default)
            if checkbox.is_checked():
                checkbox.uncheck()

            print("Clicking label...")
            try:
                label.click(timeout=2000)
            except Exception as e:
                print(f"Error clicking label: {e}")

            if checkbox.is_checked():
                print("PASS: Clicking label toggles checkbox.")
                click_works = True
            else:
                print("FAIL: Clicking label did not toggle checkbox.")
                click_works = False

            # Check cursor style
            cursor = label.evaluate("el => getComputedStyle(el).cursor")
            print(f"Cursor style: {cursor}")
            if cursor == "pointer":
                 print("PASS: Label has cursor pointer.")
                 cursor_correct = True
            else:
                 print(f"FAIL: Label cursor is {cursor}.")
                 cursor_correct = False

            if label_has_text and click_works and cursor_correct:
                print("ALL CHECKS PASSED")
            else:
                print("SOME CHECKS FAILED")
                sys.exit(1)

        except Exception as e:
            print(f"An error occurred: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    run()
