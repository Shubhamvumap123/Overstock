import threading
import http.server
import socketserver
import os
from playwright.sync_api import sync_playwright, expect
import time

PORT = 8004

def start_server():
    os.chdir(".")
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def verify_optimization():
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Give server a moment to start
    time.sleep(2)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # --- Verify appendData in livingRoom.html ---
        print("\n--- Verifying appendData in livingRoom.html ---")
        page.goto(f"http://localhost:{PORT}/livingRoom.html")

        mock_category = [
            {
                "imgUrl": "mock_image.jpg",
                "name": "Mock Item 1",
                "price": 100,
                "rating": 4.5
            }
        ]

        page.evaluate(f"""
            localStorage.setItem('category', JSON.stringify({mock_category}));
            localStorage.setItem('trending', JSON.stringify({mock_category}));
            localStorage.setItem('ourstyle', JSON.stringify({mock_category}));
        """)

        page.reload()
        page.wait_for_selector(".div1")

        items = page.locator(".div1")
        first_item = items.first
        tag_name = first_item.evaluate("el => el.tagName")
        print(f"Item tag name: {tag_name}")

        if tag_name == "A":
            print("Verified: appendData items are A tags.")
            href = first_item.get_attribute("href")
            print(f"Href: {href}")
        else:
            print(f"FAILED: appendData items are {tag_name}")

        # --- Verify appendD in test_appendD.html ---
        print("\n--- Verifying appendD in test_appendD.html ---")
        page.goto(f"http://localhost:{PORT}/test_appendD.html")

        try:
             page.wait_for_selector(".box", timeout=5000)
        except:
             print("Timeout waiting for .box")

        box_items = page.locator(".box")
        count = box_items.count()
        print(f"Found {count} box items.")

        if count > 0:
            first_box = box_items.first
            box_tag = first_box.evaluate("el => el.tagName")
            print(f"Box tag name: {box_tag}")

            if box_tag == "A":
                print("Verified: appendD items are A tags.")
                href = first_box.get_attribute("href")
                print(f"Href: {href}")
                if "productPage.html?id=test-id-123" in href:
                    print("Verified: Deep linking URL is correct.")
                else:
                    print(f"FAILED: Deep linking URL is incorrect: {href}")
            else:
                 print(f"FAILED: appendD items are {box_tag}")

        # Check for duplicate IDs generally
        posters = page.locator("#poster")
        if posters.count() > 0:
             print(f"FAILED: Found {posters.count()} elements with id='poster'")
        else:
             print("Verified: No id='poster' found.")

        # Take screenshot for visual verification
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_optimization()
