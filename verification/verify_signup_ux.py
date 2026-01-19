
from playwright.sync_api import sync_playwright

def verify_signup_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the signup page
        page.goto("http://localhost:8000/signup.html")

        # Fill in the form correctly to trigger the fetch
        page.fill("#email", "test@example.com")
        page.fill("#password", "Password123!")
        page.fill("#confirmPassword", "Password123!")
        page.check("#checkbox")

        # Click the Create Account button
        # We need to capture the state immediately after click
        # Since the fetch will fail/timeout or complete, we want to see the "Creating Account..." state

        create_account_btn = page.locator(".signUp .checkboxDiv + button")

        # We'll click and then immediately take a screenshot to try and catch the loading state.
        # Since the fetch is async, there is a window where the button is disabled.
        # However, if the fetch fails very fast (404), it might be too fast.
        # We can mock the network request to hang.

        page.route("**/*", lambda route: route.continue_()) # Default

        # Mock the register endpoint to delay
        def handle_route(route):
            # Delay response to allow screenshot of loading state
            import time
            time.sleep(2)
            route.fulfill(status=200, body='{"token": "fake"}')

        page.route("**/register", handle_route)

        create_account_btn.click()

        # Wait for button to be disabled or have text
        # create_account_btn.wait_for(state="disabled") # Playwright doesn't have wait_for state=disabled directly in older versions?
        # Check text
        # expect(create_account_btn).to_have_text("Creating Account...")

        page.wait_for_timeout(500) # Wait 0.5s to ensure UI updated

        page.screenshot(path="verification/loading_state.png")

        # Also check Sign In button
        page.fill("#inputEmail", "test@example.com")
        page.fill("#inputPassword", "password")

        sign_in_btn = page.locator(".signIn button")

        # Mock login endpoint
        page.route("**/login", handle_route)

        sign_in_btn.click()
        page.wait_for_timeout(500)

        page.screenshot(path="verification/loading_state_signin.png")

        browser.close()

if __name__ == "__main__":
    verify_signup_ux()
