from playwright.sync_api import sync_playwright
import os

def verify_stars():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Inject mock data into localStorage before loading the page
        # Note: furniture.js reads 'furniture_data' and 'moreCategory'
        page.add_init_script("""
            localStorage.setItem('furniture_data', JSON.stringify([
                {
                    "_id": "1",
                    "imgUrl": "test.jpg",
                    "name": "Test Furniture",
                    "rating": 4.5
                }
            ]));
            localStorage.setItem('moreCategory', JSON.stringify([
                 {
                    "_id": "2",
                    "imgUrl": "test2.jpg",
                    "name": "Test Furniture 2",
                    "rating": 3.0
                }
            ]));
        """)

        # Load using localhost because modules might fail on file://
        page.goto("http://localhost:8081/furniture.html")

        # Wait for content to render.
        page.wait_for_timeout(2000)

        # Check if #main has children
        main_children = page.evaluate("document.getElementById('main').children.length")
        print(f"Number of children in #main: {main_children}")

        # Take a screenshot
        page.screenshot(path="verification/stars_verification.png")

        # Verify text content of rating contains stars
        # The selector might be .rating but let's check if it exists
        elements = page.locator(".rating").all()
        print(f"Found {len(elements)} rating elements.")

        if len(elements) > 0:
            rating_text = elements[0].text_content()
            print(f"Rating text: {rating_text}")

            if "⭐" in rating_text:
                print("SUCCESS: Unicode stars found in rating text.")
            else:
                print("FAILURE: Unicode stars not found.")
        else:
             print("FAILURE: No rating elements found. Data might not have been appended.")

        browser.close()

if __name__ == "__main__":
    verify_stars()
