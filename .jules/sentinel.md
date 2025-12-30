## 2024-04-12 - Critical: Hardcoded Secrets in Auth
**Vulnerability:** Found `masaisecretkey` hardcoded as the JWT signing secret in `Authentication/src/controllers/auth.controller.js` and `Authentication/src/middlewares/authenticate.js`.
**Learning:** Developers likely copy-pasted tutorial code or used a temporary value for speed, skipping environmental configuration. The code did not fail if the secret was missing from env, leading to silent insecure defaults.
**Prevention:**
1.  Always use `process.env.VARIABLE_NAME`.
2.  Add a startup check (e.g., in `index.js`) that throws a fatal error if critical secrets are missing.
3.  Include secrets in `.env.example` (with dummy values) to prompt developers.
