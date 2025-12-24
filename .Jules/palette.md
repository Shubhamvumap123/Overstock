## 2024-05-22 - Semantic HTML in Vanilla JS Components
**Learning:** Hardcoded HTML strings in vanilla JS components often hide broken tags (like the malformed img tag in navbar) and accessibility issues. Using semantic elements like `<button>` instead of `<div>` with click handlers drastically improves accessibility without complex ARIA retrofitting.
**Action:** When auditing vanilla JS UIs, check string templates for unclosed tags and prefer changing elements to their semantic equivalents over just adding ARIA roles.
