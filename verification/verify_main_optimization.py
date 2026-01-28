from playwright.sync_api import sync_playwright, expect

def test_main_optimization(page):
    # Mock data for localStorage
    mock_data = [
        {
            "imgUrl": "https://via.placeholder.com/150",
            "name": "Test Item 1",
            "rating": 4.5
        }
    ]

    mock_data_d = [
        {
            "imageURL": "https://via.placeholder.com/150",
            "name": "Test Item D 1",
            "price": 100,
            "rating": 3.5,
            "_id": "123"
        }
    ]

    # Navigate to furniture.html (uses appendData)
    # We need to inject localStorage before scripts run, so we use add_init_script
    page.add_init_script(f"""
        localStorage.setItem('furniture_data', JSON.stringify({mock_data}));
        localStorage.setItem('moreCategory', JSON.stringify([]));
    """)

    page.goto("http://localhost:8000/furniture.html")

    # Check for <a> tag with class div1
    anchor = page.locator("a.div1").first
    # Wait for the JS to populate the grid
    expect(anchor).to_be_visible(timeout=5000)

    # Check href
    expect(anchor).to_have_attribute("href", "livingRoom.html")

    # Check image class (should be .poster, not id="poster")
    image = anchor.locator("img").first
    expect(image).to_have_class("poster")
    expect(image).not_to_have_id("poster")

    print("Verified furniture.html (appendData) optimization.")

    # Navigate to livingRoom.html (uses appendD)
    # We need to ensure appendD is called.

    page.goto("http://localhost:8000/livingRoom.html")

    # Manually invoke appendD since the default behavior might rely on dead API or empty initial list
    page.evaluate(f"""
        import('/scripts/main.js').then(module => {{
            let container = document.getElementById('prod-list');
            let data = {mock_data_d};
            module.appendD(data, container);
        }});
    """)

    # Wait for the dynamic content
    box_anchor = page.locator("a.box").first
    expect(box_anchor).to_be_visible(timeout=5000)

    # Check href
    expect(box_anchor).to_have_attribute("href", "productPage.html")

    # Check image class
    box_image = box_anchor.locator("img").first
    expect(box_image).to_have_class("poster")
    expect(box_image).not_to_have_id("poster")

    print("Verified livingRoom.html (appendD) optimization.")

    # Take screenshot
    page.screenshot(path="verification/verification_main_opt.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_main_optimization(page)
        browser.close()
