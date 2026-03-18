## 2024-12-25 - Hardcoded JWT Secret Key
**Vulnerability:** The JWT signing key was hardcoded as `"masaisecretkey"` in `Authentication/src/controllers/auth.controller.js` and `Authentication/src/middlewares/authenticate.js`.
**Learning:** Hardcoded secrets in source code allow anyone with access to the repo (even read-only) to forge authentication tokens and impersonate any user.
**Prevention:** Always use environment variables for secrets. Implement a startup check to fail fast if required secrets are missing from the environment.

## 2025-02-18 - JWT Password Hash Leak
**Vulnerability:** The `generateToken` function in `authentication_Oath-main` was signing the entire Mongoose document (including the hashed password) into the JWT payload.
**Learning:** `jwt.sign` does not automatically filter objects. Mongoose documents, even when stringified or passed directly, may contain internal fields or sensitive data unless explicitly sanitized (e.g., via `.lean()` or manual selection).
**Prevention:** Always explicitly construct the JWT payload with only the necessary public fields (allowlisting) rather than passing the whole user object.

## 2025-05-18 - Mass Assignment & Information Exposure in Auth Controller
**Vulnerability:** The `register` and `login` endpoints in `Authentication` passed `req.body` directly to `User.create` (Mass Assignment) and returned the full Mongoose user document in the response (exposing password hash).
**Learning:** Convenience methods like `res.send({ user })` or `User.create(req.body)` are dangerous defaults. They rely on the schema being restrictive, but fail when the schema evolves or when default behavior includes sensitive fields like password hashes.
**Prevention:** Use explicit field selection for both input (Allowlisting in controller) and output (DTOs or specific field selection).
