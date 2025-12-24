## 2024-05-23 - Legacy DOM Pattern Performance
**Learning:** This vanilla JS codebase relies heavily on direct DOM manipulation loops (`parent.append` inside `forEach`) for list rendering, which is a major bottleneck due to layout thrashing.
**Action:** Standardize on `DocumentFragment` for all list rendering functions in `scripts/` to decouple data processing from DOM updates.
