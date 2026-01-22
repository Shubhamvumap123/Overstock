## 2024-05-22 - [Pattern: Redundant Event Listeners]
**Learning:** Found 15 identical event listeners and a 15-block global click handler. This creates bloated code and unnecessary condition checks on every click.
**Action:** Use event delegation or a single loop to attach listeners. Use generic selectors for global handlers.

## 2024-05-24 - [Pattern: Blocking Top-Level Await]
**Learning:** `scripts/furniture.js` used a top-level `await` to fetch data from a slow/broken API, blocking the rendering of locally available content. The fetched data was also unused (dead code).
**Action:** Remove unused blocking calls. Ensure critical/local content is rendered before awaiting external data.

## 2026-01-02 - [Pattern: Recurring Blocking Await]
**Learning:** Encountered the blocking top-level `await` anti-pattern again in `scripts/livingRoom.js`. This blocks the main thread when the API (overstockapi) fails.
**Action:** When working in this codebase, assume external API calls are blocking and potentially broken. Always verify page load with network offline or API failures.

## 2026-01-03 - Frontend Semantic Navigation Optimization
**Learning:** Legacy frontend code relied on `div` elements with `onclick` handlers for navigation, which hurts accessibility and SEO. Replacing them with semantic `<a>` tags requires careful verification of styling (`display: block`, `color: inherit`) to ensure no visual regression.
**Action:** When auditing legacy JS-heavy sites, look for `div` based navigation and refactor to `<a>` tags early.

## 2026-01-03 - Playwright LocalStorage Access
**Learning:** `localStorage` is origin-bound. Attempting to set it on `about:blank` in Playwright fails with a SecurityError.
**Action:** Always navigate to the target origin (e.g., `http://localhost:8000/`) before attempting to inject `localStorage` data in tests.
