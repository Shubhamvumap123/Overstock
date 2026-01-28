from playwright.sync_api import sync_playwright

def verify_password_toggle():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to page
        page.goto("http://localhost:3000/signup.html")

        # Check for toggle buttons
        toggles = page.locator(".password-toggle")
        count = toggles.count()
        print(f"Found {count} toggle buttons")

        if count != 3:
            print("FAILED: Expected 3 toggle buttons")
            exit(1)

        # Test each password input-toggle pair
        inputs = [
             "#password",
             "#confirmPassword",
             "#inputPassword"
        ]

        # Type some text into inputs so we can see the effect in screenshot (though password dots are not easily visible in headless screenshot sometimes)
        for selector in inputs:
            page.fill(selector, "Secret123!")

        page.screenshot(path="verification/password_toggle_initial.png")
        print("Initial screenshot taken")

        for selector in inputs:
            print(f"Testing {selector}")
            inp = page.locator(selector)

            # Find the sibling button
            wrapper = inp.locator("xpath=..")
            btn = wrapper.locator(".password-toggle")

            # Initial state
            if inp.get_attribute("type") != "password":
                print(f"FAILED: Initial type is not password for {selector}")
                exit(1)

            # Click to show
            btn.click()
            if inp.get_attribute("type") != "text":
                print(f"FAILED: Type did not change to text for {selector}")
                exit(1)

        page.screenshot(path="verification/password_toggle_shown.png")
        print("Shown screenshot taken")

        for selector in inputs:
            inp = page.locator(selector)
            wrapper = inp.locator("xpath=..")
            btn = wrapper.locator(".password-toggle")

            # Click to hide
            btn.click()
            if inp.get_attribute("type") != "password":
                print(f"FAILED: Type did not change back to password for {selector}")
                exit(1)

            print(f"SUCCESS: {selector} toggle works")

        print("All tests passed")
        browser.close()

if __name__ == "__main__":
    verify_password_toggle()
