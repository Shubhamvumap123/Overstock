from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import time
import os

PORT = 8000
SERVER_URL = f"http://localhost:{PORT}"

def start_server():
    os.chdir(".")
    # Allow python to bind to address already in use (if previous run didn't clean up perfectly)
    socketserver.TCPServer.allow_reuse_address = True
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def verify():
    # Start server in background
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("--- Test 1: Verify Deep Linking in productPage.html ---")
        test_id = "test_product_123"
        print(f"Navigating to {SERVER_URL}/productPage.html?id={test_id}")

        api_called_with_id = False

        def handle_route(route):
            nonlocal api_called_with_id
            if test_id in route.request.url:
                api_called_with_id = True
                print(f"Intercepted API call to: {route.request.url}")
                route.fulfill(status=200, body='{"name": "Test Product", "price": 100, "rating": 4.5, "imageURL": "test.jpg"}')
            else:
                route.continue_()

        # Intercept calls to localhost:5000 (backend)
        page.route("**/products/*", handle_route)

        page.goto(f"{SERVER_URL}/productPage.html")
        page.evaluate("localStorage.clear()")
        page.goto(f"{SERVER_URL}/productPage.html?id={test_id}")
        page.wait_for_timeout(2000)

        if api_called_with_id:
            print("✅ SUCCESS: API call included the ID from URL parameter.")
        else:
            print("❌ FAILURE: API call did NOT include the ID from URL parameter.")

        print("\n--- Test 2: Verify scripts/main.js Refactor ---")
        page.goto(f"{SERVER_URL}/verification/verify_main_refactor.html")
        page.wait_for_timeout(1000)

        # Check appendData (categories)
        cats = page.locator("#category-container > a")
        count_cats = cats.count()
        print(f"Found {count_cats} category links.")

        if count_cats > 0:
            href = cats.first.get_attribute("href")
            tag_name = cats.first.evaluate("el => el.tagName")
            display = cats.first.evaluate("el => getComputedStyle(el).display")

            if tag_name == "A" and href == "livingRoom.html" and display == "block":
                 print("✅ SUCCESS: appendData uses <a> tags with correct href and display:block.")
            else:
                 print(f"❌ FAILURE: appendData elements are {tag_name}, href={href}, display={display}")

            # Check duplicate IDs in images
            poster_ids = page.locator("#category-container #poster").count()
            poster_classes = page.locator("#category-container .poster").count()
            if poster_ids == 0 and poster_classes > 0:
                 print("✅ SUCCESS: appendData uses class='poster' instead of id='poster'.")
            else:
                 print(f"❌ FAILURE: appendData found {poster_ids} id='poster' (should be 0) and {poster_classes} class='poster'.")


        # Check appendD (products)
        prods = page.locator("#product-container > a")
        count_prods = prods.count()
        print(f"Found {count_prods} product links.")

        if count_prods > 0:
            href = prods.first.get_attribute("href")
            tag_name = prods.first.evaluate("el => el.tagName")

            if tag_name == "A" and "productPage.html?id=" in href:
                 print("✅ SUCCESS: appendD uses <a> tags with deep link href.")
            else:
                 print(f"❌ FAILURE: appendD elements are {tag_name}, href={href}")

             # Check duplicate IDs in images
            poster_ids = page.locator("#product-container #poster").count()
            poster_classes = page.locator("#product-container .poster").count()
            if poster_ids == 0 and poster_classes > 0:
                 print("✅ SUCCESS: appendD uses class='poster' instead of id='poster'.")
            else:
                 print(f"❌ FAILURE: appendD found {poster_ids} id='poster' (should be 0) and {poster_classes} class='poster'.")

        browser.close()

if __name__ == "__main__":
    try:
        verify()
    except Exception as e:
        print(f"Error: {e}")
