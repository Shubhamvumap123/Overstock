## 2024-05-24 - Frontend DOM Manipulation Optimization
**Learning:** Frequent DOM manipulation in loops (e.g., `parent.append(div)` inside `forEach`) causes unnecessary reflows and repaints, degrading performance especially with large datasets.
**Action:** Use `DocumentFragment` to batch DOM nodes in memory and append them to the DOM in a single operation (`parent.append(fragment)`). This reduces reflows to just one.
