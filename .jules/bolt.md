## 2024-05-22 - [Pattern: Redundant Event Listeners]
**Learning:** Found 15 identical event listeners and a 15-block global click handler. This creates bloated code and unnecessary condition checks on every click.
**Action:** Use event delegation or a single loop to attach listeners. Use generic selectors for global handlers.
