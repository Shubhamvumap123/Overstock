import re

def fix_stars(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # regex to find the specific p tag with id="stars"
    # content has pattern: <p id="stars">&#11088&#11088&#11088&#11088&#11088</p>

    old_string = '<p id="stars">&#11088&#11088&#11088&#11088&#11088</p>'
    new_string = '<p class="stars" role="img" aria-label="Rated 5 out of 5 stars"><span aria-hidden="true">&#11088&#11088&#11088&#11088&#11088</span></p>'

    new_content = content.replace(old_string, new_string)

    if new_content == content:
        print("No changes made. Pattern might not match exactly.")
    else:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Successfully updated {filepath}")

if __name__ == "__main__":
    fix_stars('index.html')
