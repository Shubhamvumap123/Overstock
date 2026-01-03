## 2024-04-12 - Sensitive Data Exposure in Logs
**Vulnerability:** Found `console.log(accessToken, refreshToken, profile)` in `authentication_Oath-main/src/config/google.auth.js` and `console.log(decoded)` in `Authentication/src/middlewares/authenticate.js`.
**Learning:** Developers likely used these logs for debugging during development but failed to remove them before committing, exposing sensitive OAuth tokens and user PII.
**Prevention:** Implement a secure logging strategy that scrubs sensitive data (e.g., tokens, passwords, PII) and use a linter rule (e.g., `no-console`) to flag console logs in production code. Always review logs before pushing.
