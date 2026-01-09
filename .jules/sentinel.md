## 2024-12-25 - Hardcoded JWT Secret Key
**Vulnerability:** The JWT signing key was hardcoded as `"masaisecretkey"` in `Authentication/src/controllers/auth.controller.js` and `Authentication/src/middlewares/authenticate.js`.
**Learning:** Hardcoded secrets in source code allow anyone with access to the repo (even read-only) to forge authentication tokens and impersonate any user.
**Prevention:** Always use environment variables for secrets. Implement a startup check to fail fast if required secrets are missing from the environment.

## 2024-05-22 - Sensitive Data Exposure in Logs
**Vulnerability:** Found multiple instances of `console.log` outputting OAuth access tokens, refresh tokens, user objects (including password hashes), and full request objects in production-path code.
**Learning:** Developers often leave debug logging in place that exposes critical secrets. In a backend service, `console.log(req)` or `console.log(user)` can inadvertently leak PII, credentials, and session tokens to log aggregators which may have wider access than the production DB.
**Prevention:** Enforce a strict "no console.log" policy for production code via linting (e.g., `no-console` rule). Use a structured logger (like Winston or Pino) with redaction capabilities for sensitive fields, and ensure debug logs are disabled in production.
