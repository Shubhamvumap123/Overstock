## 2024-05-24 - Accessibility Patterns for Navigation
**Learning:** In this vanilla JS project, replacing `div` elements that use `onclick` with native semantic HTML elements (`<a>` or `<button>`) is the most robust way to ensure keyboard accessibility (tab order, enter key activation) without writing custom event handlers.
**Action:** Always prefer refactoring to native elements over adding `role="button"` and `tabindex="0"` to divs, as the latter requires additional JS for keyboard support.

## 2024-05-24 - Accessible Ratings
**Learning:** Repeating Unicode characters (like stars) for ratings causes verbose and unhelpful screen reader output ("White medium star...").
**Action:** Wrap such visual indicators in a container with `role="img"` and a descriptive `aria-label` (e.g., "Rated 5 out of 5 stars"), while hiding the characters themselves with `aria-hidden="true"`.

## 2024-05-24 - Enhancing Static UI
**Learning:** Static lists of "trending" items or tags are often dead ends in prototypes. Making them interactive (populating a search bar or filtering) significantly improves the perceived quality of the prototype with minimal code (event delegation).
**Action:** When seeing static "tag clouds" or lists, add simple click-to-search functionality using event delegation to handle all items with a single listener.

## 2026-01-18 - Form Label Association
**Learning:** Found checkboxes where the descriptive text was in a sibling `<p>` tag instead of the `<label>`, making the text unclickable and breaking accessibility association.
**Action:** Always verify that form labels wrap their descriptive text or use `for`/`id` association correctly with the text content inside the label, especially for checkboxes/radios where click target size matters.

## 2026-01-24 - Semantic Actions
**Learning:** Found usage of `<u>` tags with `onclick` handlers for "Remove" actions, which are inaccessible and non-semantic.
**Action:** Replace `<u>` tags used for actions with `<button>` elements styled to look like links (if desired), ensuring keyboard focus, screen reader support, and proper semantics.
