
import json
from playwright.sync_api import sync_playwright

def verify_furniture_optimization():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock localStorage with some data so the page has content to render
        mock_data = [
            {
                "name": "Test Chair",
                "price": 100,
                "img": "https://via.placeholder.com/150",
                "type": "Chair"
            },
            {
                "name": "Test Table",
                "price": 200,
                "img": "https://via.placeholder.com/150",
                "type": "Table"
            }
        ]

        # Inject localStorage before page load
        page.add_init_script(f"""
            localStorage.setItem("furniture_data", '{json.dumps(mock_data)}');
        """)

        # Start a request listener to ensure the dead API is NOT called
        api_called = False
        def handle_request(request):
            nonlocal api_called
            if "overstockapi.herokuapp.com" in request.url:
                api_called = True
                print(f"FAILED: Request made to {request.url}")

        page.on("request", handle_request)

        # Go to the local server
        page.goto("http://localhost:3000/furniture.html")

        # Wait for content to render
        try:
            # The script creates divs inside #main
            page.wait_for_selector("#main > div", timeout=5000)
            print("DOM content rendered successfully.")
        except:
            print("Timed out waiting for content.")
            # Dump console logs to debug
            page.on("console", lambda msg: print(f"Console: {msg.text}"))

        # Take screenshot
        page.screenshot(path="verification/furniture_verified.png")

        if api_called:
            print("FAILURE: Dead API was called.")
        else:
            print("SUCCESS: Dead API was NOT called.")

        browser.close()

if __name__ == "__main__":
    verify_furniture_optimization()
