
from playwright.sync_api import sync_playwright

def verify_accessibility(page):
    page.goto('http://localhost:3000/index.html')

    # Verify "See All Styles" is now a link
    see_all_styles_link = page.locator('#btn > a')
    assert see_all_styles_link.get_attribute('href') == 'furniture.html'
    assert see_all_styles_link.text_content() == 'See All Styles'

    # Check if images have alt text
    # Banners
    banner_one = page.locator('#bannerfirstleftpart > img')
    assert banner_one.get_attribute('alt') == 'Overstock Promotional Banner'

    banner_three = page.locator('#bannerthird > img')
    assert banner_three.get_attribute('alt') == 'Fresh Finds Category Banner'

    banner_five = page.locator('#bannerfive > img')
    assert banner_five.get_attribute('alt') == 'Overstock Featured Brands'

    # Take screenshot of the "See All Styles" button area
    # Scroll to it
    see_all_styles_link.scroll_into_view_if_needed()
    page.screenshot(path='verification/see_all_styles.png')

    print("Verification successful!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_accessibility(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            exit(1)
        finally:
            browser.close()
