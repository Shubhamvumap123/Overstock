from playwright.sync_api import sync_playwright
import json
import os
import sys

# The server is already running on port 3001 via bash command (I'll reuse it if it's still running, otherwise I need to restart it)
# Since I killed it in previous steps, I should restart it.
# But wait, I killed it in the previous step "kill $(lsof -t -i :3001)".

PORT = 3001

def verify_render():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Mock data
        mock_data = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item 1",
                "price": 100,
                "rating": 4.5
            },
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item 2",
                "price": 200,
                "rating": 3.0
            }
        ]

        # Inject data before loading
        page.add_init_script(f"""
            localStorage.setItem('list_id', '{json.dumps(mock_data)}');
        """)

        try:
            page.goto(f"http://localhost:{PORT}/list.html")
        except Exception as e:
            print(f"Error navigating: {e}")
            sys.exit(1)

        # Wait for elements to appear
        try:
            page.wait_for_selector("#prod-list > div", timeout=5000)
        except Exception as e:
            print(f"Error waiting for selector: {e}")
            sys.exit(1)

        # Screenshot
        page.screenshot(path="/home/jules/verification/list_render.png")
        print("Screenshot taken at /home/jules/verification/list_render.png")

        browser.close()

if __name__ == "__main__":
    verify_render()
