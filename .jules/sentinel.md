# Sentinel's Journal

## 2024-05-22 - Exposed Sensitive OAuth Tokens in Logs
**Vulnerability:** Found `console.log(accessToken, refreshToken, profile)` in `authentication_Oath-main/src/config/google.auth.js`.
**Learning:** Developers likely added these logs for debugging during the implementation of OAuth flow and forgot to remove them. This exposes critical secrets (refresh tokens) which can be used to impersonate users persistently.
**Prevention:**
1. Use a logger (like Winston or Pino) that can be configured to redact sensitive fields or disable logging in production.
2. Implement pre-commit hooks or linting rules (e.g., `no-console`) to flag `console.log` statements in sensitive files.
3. Conduct code reviews specifically checking for logging of credentials in authentication flows.
