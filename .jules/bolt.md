## 2024-05-23 - LocalStorage Data Seeding Anti-pattern
**Learning:** Using a synchronous script to write static data to `localStorage` and then immediately reading it back in another script is a performance anti-pattern. It blocks the parser, adds serialization/deserialization overhead, and creates implicit dependencies.
**Action:** Export static data as ES modules and import them directly where needed. This allows for asynchronous loading and better code organization.
