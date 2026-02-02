## 2024-12-25 - Hardcoded JWT Secret Key
**Vulnerability:** The JWT signing key was hardcoded as `"masaisecretkey"` in `Authentication/src/controllers/auth.controller.js` and `Authentication/src/middlewares/authenticate.js`.
**Learning:** Hardcoded secrets in source code allow anyone with access to the repo (even read-only) to forge authentication tokens and impersonate any user.
**Prevention:** Always use environment variables for secrets. Implement a startup check to fail fast if required secrets are missing from the environment.

## 2025-02-18 - JWT Password Hash Leak
**Vulnerability:** The `generateToken` function in `authentication_Oath-main` was signing the entire Mongoose document (including the hashed password) into the JWT payload.
**Learning:** `jwt.sign` does not automatically filter objects. Mongoose documents, even when stringified or passed directly, may contain internal fields or sensitive data unless explicitly sanitized (e.g., via `.lean()` or manual selection).
**Prevention:** Always explicitly construct the JWT payload with only the necessary public fields (allowlisting) rather than passing the whole user object.

## 2025-02-18 - API Response Password Hash Leak
**Vulnerability:** The `authentication_Oath-main` service returned the full Mongoose user document in the JSON response for `register` and `login` endpoints.
**Learning:** Default behavior of `res.send(user)` with Mongoose documents includes all fields defined in the schema (including password hashes) unless `select: false` is set in the schema or `toJSON` transformation is applied.
**Prevention:** Implement a Data Transfer Object (DTO) pattern or explicit response sanitization layer to ensure only safe, allowlisted fields are returned to the client.
