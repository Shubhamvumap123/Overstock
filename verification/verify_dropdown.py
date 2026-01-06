from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open the local server
        print("Navigating to http://localhost:3000/index.html")
        page.goto("http://localhost:3000/index.html")

        # Wait for the navbar to be present (it's injected via JS)
        print("Waiting for navbar...")
        try:
            page.wait_for_selector("#navbar", state="attached", timeout=5000)
            # wait a bit more for innerHTML injection
            time.sleep(1)
        except Exception as e:
            print(f"Error waiting for navbar: {e}")
            print(page.content())
            return

        # Check if scripts ran
        trigger_sel = ".section-div > div"
        dropdown_sel = ".dropdown-content-part"

        if page.locator(trigger_sel).count() == 0:
            print(f"Trigger {trigger_sel} not found.")
            return

        trigger = page.locator(trigger_sel).first
        dropdown = page.locator(dropdown_sel).first

        print("Initial display:", dropdown.evaluate("el => getComputedStyle(el).display"))

        # Hover
        print("Hovering trigger...")
        trigger.hover()
        time.sleep(0.5)

        display = dropdown.evaluate("el => getComputedStyle(el).display")
        print("Display after hover:", display)

        if display != "flex":
             print("FAILED: Dropdown did not show up.")
        else:
             print("SUCCESS: Dropdown showed up.")

        # Move mouse out
        print("Mouse out...")
        # Hover body to move out
        page.locator("body").hover()
        time.sleep(0.5)

        # In the original code, the mouseout listener is on the DROPDOWN container.
        # So if we hover trigger -> dropdown shows.
        # If we move mouse to body, we left the trigger. But did we leave the dropdown?
        # The dropdown is initially hidden. When shown, it appears.
        # If I hover the trigger, the dropdown shows.
        # If I move to body directly, the `mouseout` event on `dropdown` might NOT fire if the mouse never entered it?
        # Or maybe the dropdown covers the trigger?

        # If the original code works as intended, it probably expects user to move mouse INTO the dropdown and then OUT.
        # Let's try that flow.
        trigger.hover()
        time.sleep(0.5)

        # Move into dropdown (assuming it's visible now)
        # We need to make sure we hit it.
        # But wait, if I can hover it, it means it's visible.
        if display == "flex":
            print("Hovering dropdown...")
            dropdown.hover()
            time.sleep(0.5)

            print("Moving out of dropdown...")
            page.locator("body").hover()
            time.sleep(0.5)

            display_after = dropdown.evaluate("el => getComputedStyle(el).display")
            print("Display after mouse out of dropdown:", display_after)

            if display_after == "none":
                print("SUCCESS: Dropdown closed after mouse out.")
            else:
                print("FAILED: Dropdown did not close after mouse out.")

        browser.close()

if __name__ == "__main__":
    run()
