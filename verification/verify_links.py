
import os

def verify():
    if not os.path.exists('index.html'):
        print("index.html not found")
        return

    with open('index.html', 'r') as f:
        content = f.read()

    start = content.find('id="bannertwo"')
    if start == -1:
        print("bannertwo not found")
        return

    # Grab the section until the next ID or large enough chunk
    # bannertwo seems to end before "Things We Know You'll Love" (id="b2h2")
    end = content.find('id="b2h2"', start)
    if end == -1:
        snippet = content[start:start+4000]
    else:
        snippet = content[start:end]

    # Check for button vs a
    buttons = snippet.count('<button')
    links = snippet.count('<a href')

    print(f"Found {buttons} buttons and {links} links in #bannertwo section.")

    if links >= 6 and buttons == 0:
        print("SUCCESS: All buttons refactored to links.")
    elif buttons > 0:
        print("FAILURE: Still found buttons.")
    else:
        print(f"WARNING: Found {links} links (expected 6).")

if __name__ == "__main__":
    verify()
