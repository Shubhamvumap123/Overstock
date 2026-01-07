## 2024-05-24 - Accessibility Patterns for Navigation
**Learning:** In this vanilla JS project, replacing `div` elements that use `onclick` with native semantic HTML elements (`<a>` or `<button>`) is the most robust way to ensure keyboard accessibility (tab order, enter key activation) without writing custom event handlers.
**Action:** Always prefer refactoring to native elements over adding `role="button"` and `tabindex="0"` to divs, as the latter requires additional JS for keyboard support.

## 2024-05-24 - Accessible Ratings
**Learning:** Repeating Unicode characters (like stars) for ratings causes verbose and unhelpful screen reader output ("White medium star...").
**Action:** Wrap such visual indicators in a container with `role="img"` and a descriptive `aria-label` (e.g., "Rated 5 out of 5 stars"), while hiding the characters themselves with `aria-hidden="true"`.
