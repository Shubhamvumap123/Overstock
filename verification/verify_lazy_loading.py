from playwright.sync_api import sync_playwright, expect

def test_lazy_loading(page):
    # Navigate to a page that uses scripts/main.js or scripts/list.js
    # Since index.html doesn't seem to use appendData directly in the inline script,
    # let's try livingRoom.html which likely uses list.js or main.js logic.
    # Wait, livingRoom.html likely uses livingRoom.js.
    # Let's inspect livingRoom.js

    # Actually, let's mock the data and use a page we know uses list.js, or just check cart.html after adding an item.

    # Let's test cart.html as it uses cart.js where we added lazy loading.
    # We need to inject data into localStorage for cartItems.

    cart_items = [
        {
            "imageURL": "https://dummyimage.com/200x200/000/fff",
            "name": "Test Item 1",
            "price": "100"
        },
        {
            "imageURL": "https://dummyimage.com/200x200/000/fff",
            "name": "Test Item 2",
            "price": "200"
        }
    ]

    page.add_init_script(f"""
        localStorage.setItem('cartItems', JSON.stringify({cart_items}));
    """)

    page.goto("http://localhost:8000/cart.html")

    # Wait for the images to be added to the DOM
    page.wait_for_selector("#left img")

    # Get all images in the #left container
    images = page.locator("#left img").all()

    print(f"Found {len(images)} images in cart.")

    for i, img in enumerate(images):
        # Check for loading="lazy"
        loading_attr = img.get_attribute("loading")
        decoding_attr = img.get_attribute("decoding")

        print(f"Image {i}: loading={loading_attr}, decoding={decoding_attr}")

        if loading_attr != "lazy":
            print(f"Error: Image {i} missing loading='lazy'")
        if decoding_attr != "async":
            print(f"Error: Image {i} missing decoding='async'")

        assert loading_attr == "lazy"
        assert decoding_attr == "async"

    # Take a screenshot
    page.screenshot(path="/home/jules/verification/cart_lazy_load.png")
    print("Verification screenshot saved to /home/jules/verification/cart_lazy_load.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_lazy_loading(page)
        except Exception as e:
            print(f"Test failed: {e}")
            exit(1)
        finally:
            browser.close()
