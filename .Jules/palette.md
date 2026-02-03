## 2024-05-23 - Micro-interactions over Disruptions
**Learning:** The "Add to Cart" button redirected immediately to the cart, and "Favorites" used a native `alert()`. Both were disruptive. Replacing them with inline button state changes ("Added!") provides sufficient feedback without breaking flow.
**Action:** When working on action buttons, always prefer inline feedback (text change, disabled state, toast) over alerts or redirects unless the user explicitly requested navigation.
