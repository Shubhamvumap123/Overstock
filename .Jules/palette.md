# Palette's Journal

## 2024-05-22 - Navbar Accessibility and Cleanliness
**Learning:** Found malformed HTML in a critical component (navbar) where `src` attribute was not properly closed, merging with `alt` attribute. This likely broke the image and any accessibility tools parsing it.
**Action:** Always check `src` and `alt` attributes in image tags, especially when copying from other sources. Also, ensure inputs have `aria-label` when no visible label exists.
