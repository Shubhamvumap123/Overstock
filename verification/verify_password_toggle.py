import time
import subprocess
import sys
from playwright.sync_api import sync_playwright

def run_server():
    # Start a simple HTTP server in the background
    server_process = subprocess.Popen(
        ["python3", "-m", "http.server", "3000"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(2)  # Wait for server to start
    return server_process

def verify_password_toggle():
    server = run_server()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("http://localhost:3000/signup.html")

            # Define the password fields to check
            password_fields = ["#password", "#confirmPassword", "#inputPassword"]

            for field_id in password_fields:
                print(f"Checking field: {field_id}")
                input_field = page.locator(field_id)

                # Check if input exists
                if input_field.count() == 0:
                    print(f"Input {field_id} not found.")
                    sys.exit(1)

                input_field.fill("secret123")

                # Verify initial type is password
                initial_type = input_field.get_attribute("type")
                if initial_type != "password":
                    print(f"Error: Initial type for {field_id} is {initial_type}, expected 'password'")
                    sys.exit(1)

                # Locate the wrapper and button
                # We expect the input to be inside .password-wrapper and have a sibling button
                wrapper = page.locator(f".password-wrapper:has({field_id})")
                toggle_btn = wrapper.locator(".password-toggle")

                if toggle_btn.count() == 0:
                     print(f"Toggle button not found for {field_id}. Verify changes are applied.")
                     sys.exit(1)

                # Check accessibility label
                aria_label = toggle_btn.get_attribute("aria-label")
                if aria_label != "Show password":
                    print(f"Error: Initial aria-label is '{aria_label}', expected 'Show password'")
                    sys.exit(1)

                toggle_btn.click()

                # Verify type changed to text
                current_type = input_field.get_attribute("type")
                if current_type != "text":
                    print(f"Error: Type for {field_id} is {current_type} after click, expected 'text'")
                    sys.exit(1)

                # Check accessibility label update
                aria_label = toggle_btn.get_attribute("aria-label")
                if aria_label != "Hide password":
                    print(f"Error: aria-label is '{aria_label}' after click, expected 'Hide password'")
                    sys.exit(1)

                toggle_btn.click()

                # Verify type changed back to password
                final_type = input_field.get_attribute("type")
                if final_type != "password":
                    print(f"Error: Type for {field_id} is {final_type} after second click, expected 'password'")
                    sys.exit(1)

                print(f"Field {field_id} passed.")

            browser.close()
            print("All password fields verified successfully.")

    except Exception as e:
        print(f"Verification failed: {e}")
        sys.exit(1)
    finally:
        server.terminate()

if __name__ == "__main__":
    verify_password_toggle()
