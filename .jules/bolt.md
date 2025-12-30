## 2024-05-22 - [Pattern: Redundant Event Listeners]
**Learning:** Found 15 identical event listeners and a 15-block global click handler. This creates bloated code and unnecessary condition checks on every click.
**Action:** Use event delegation or a single loop to attach listeners. Use generic selectors for global handlers.

## 2024-05-22 - [Pattern: Top-level Await Blocking]
**Learning:** Found a top-level `await` for an external API in a module script (`furniture.js`). This blocks the entire module from executing and halts rendering until the request completes or times out. In this case, the data was unused.
**Action:** Move data fetching inside async functions invoked after initial render, or use `Promise.all` for parallel fetching. Verify if data is actually used before fetching.
