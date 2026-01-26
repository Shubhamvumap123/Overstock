## 2024-12-25 - Hardcoded JWT Secret Key
**Vulnerability:** The JWT signing key was hardcoded as `"masaisecretkey"` in `Authentication/src/controllers/auth.controller.js` and `Authentication/src/middlewares/authenticate.js`.
**Learning:** Hardcoded secrets in source code allow anyone with access to the repo (even read-only) to forge authentication tokens and impersonate any user.
**Prevention:** Always use environment variables for secrets. Implement a startup check to fail fast if required secrets are missing from the environment.

## 2025-02-18 - JWT Password Hash Leak
**Vulnerability:** The `generateToken` function in `authentication_Oath-main` was signing the entire Mongoose document (including the hashed password) into the JWT payload.
**Learning:** `jwt.sign` does not automatically filter objects. Mongoose documents, even when stringified or passed directly, may contain internal fields or sensitive data unless explicitly sanitized (e.g., via `.lean()` or manual selection).
**Prevention:** Always explicitly construct the JWT payload with only the necessary public fields (allowlisting) rather than passing the whole user object.

## 2025-02-20 - Mass Assignment in Mongoose
**Vulnerability:** The `register` controller passed `req.body` directly to `User.create()`, allowing potentially malicious fields to be saved if the schema permits or evolves.
**Learning:** Even with strict schemas, relying on implicit filtering is risky. Mongoose models can be vulnerable to injection if inputs are not validated.
**Prevention:** Explicitly destructure and validate inputs before passing them to database methods.
