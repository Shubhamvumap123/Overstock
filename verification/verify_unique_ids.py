from playwright.sync_api import sync_playwright
import json
import time

def verify_unique_ids():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a new context to ensure clean state
        context = browser.new_context()
        page = context.new_page()

        # Mock localStorage data for livingRoom.html
        mock_data = [
            {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item 1",
                "price": 100,
                "rating": 4.5,
                "_id": "1"
            },
             {
                "imageURL": "https://via.placeholder.com/150",
                "name": "Test Item 2",
                "price": 200,
                "rating": 3.5,
                "_id": "2"
            }
        ]

        # Inject localStorage before page load
        # livingRoom.js reads "category", "trending", "ourstyle"
        # We'll populate "category" which uses appendData (id="poster")
        # And "trending" which uses appendData (id="poster")
        # And "ourstyle" which uses appendData (id="poster")

        # Actually livingRoom.js:
        # let category = ... appendData(category, parent) -> uses appendData
        # let trend = ... appendData(trend, trending) -> uses appendData
        # let ourSty = ... appendData(ourSty,parent1) -> uses appendData

        # And checks for sortElement to use appendD.

        page.add_init_script(f"""
            localStorage.setItem('category', JSON.stringify({json.dumps(mock_data)}));
        """)

        # Navigate to page served by python http.server
        try:
            page.goto("http://localhost:3000/livingRoom.html")
        except Exception as e:
            print(f"Error navigating: {e}")
            browser.close()
            exit(1)

        # Wait for content to load
        try:
            page.wait_for_selector(".div1", timeout=5000)
        except:
            print("Timeout waiting for content")
            browser.close()
            exit(1)

        # check for duplicate IDs
        # We expect 2 images with id="poster" in the current buggy state

        # Evaluate js to find duplicate IDs
        duplicate_ids = page.evaluate("""() => {
            const ids = {};
            const duplicates = [];
            document.querySelectorAll('[id]').forEach(el => {
                if (ids[el.id]) {
                    duplicates.push(el.id);
                } else {
                    ids[el.id] = true;
                }
            });
            return duplicates;
        }""")

        print(f"Duplicate IDs found: {duplicate_ids}")

        # Check for class "poster"
        poster_classes = page.locator(".poster").count()
        print(f"Elements with class 'poster': {poster_classes}")

        # Check for id "poster"
        poster_ids = page.locator("#poster").count()
        print(f"Elements with id 'poster': {poster_ids}")

        if "poster" in duplicate_ids:
            print("FAILURE: Duplicate ID 'poster' found.")
            # Verify style application (likely failed or inconsistent)
        else:
            print("SUCCESS: No duplicate ID 'poster'.")
            if poster_classes > 0:
                 print("SUCCESS: Class 'poster' is being used.")
            else:
                 print("WARNING: Class 'poster' not found (might be intended if renamed).")

        page.screenshot(path="verification_unique_ids.png")
        browser.close()

if __name__ == "__main__":
    verify_unique_ids()
