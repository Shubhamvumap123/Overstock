## 2026-01-04 - [Critical Information Disclosure in JWT]
**Vulnerability:** The `generateToken` function in `Authentication/src/controllers/auth.controller.js` was signing the entire Mongoose user document, which included the hashed password (`password` field) and other internal fields.
**Learning:** Developers often pass full ORM/ODM objects to token generation functions for convenience, not realizing that `toJSON()` or implicit serialization might include sensitive fields unless explicitly excluded at the schema level.
**Prevention:** Always explicitly select the specific claims (e.g., `_id`, `email`, `role`) needed for the JWT payload. Do not rely on default object serialization for security-critical operations.
