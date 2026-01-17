## 2024-12-25 - Hardcoded JWT Secret Key
**Vulnerability:** The JWT signing key was hardcoded as `"masaisecretkey"` in `Authentication/src/controllers/auth.controller.js` and `Authentication/src/middlewares/authenticate.js`.
**Learning:** Hardcoded secrets in source code allow anyone with access to the repo (even read-only) to forge authentication tokens and impersonate any user.
**Prevention:** Always use environment variables for secrets. Implement a startup check to fail fast if required secrets are missing from the environment.

## 2026-01-17 - Sensitive Data Exposure & Mass Assignment in Auth
**Vulnerability:** The `generateToken` function included the entire user object (including password hash) in the JWT payload. Additionally, the `register` endpoint allowed Mass Assignment by passing `req.body` directly to `User.create`.
**Learning:** Convenience methods like `jwt.sign({ user })` or `User.create(req.body)` often lead to security gaps. Explicitly selecting fields for tokens and database operations is crucial for security.
**Prevention:** Always whitelist fields for JWT payloads and database writes. Never serialize full database objects to clients or tokens.
