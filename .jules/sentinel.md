## 2024-12-25 - Hardcoded Secrets in Configuration
**Vulnerability:** Hardcoded MongoDB connection string with credentials found in `Authentication/src/configs/db.js`.
**Learning:** Even if `dotenv` is installed, it doesn't mean it's being used. Secrets are often hardcoded in early development and forgotten.
**Prevention:** Always use environment variables for secrets from the start. Add `.env` to `.gitignore` immediately. Audit `config` folders for secrets.

## 2024-05-23 - Hardcoded Database Credentials
**Vulnerability:** Found hardcoded MongoDB connection string with username/password in `authentication_Oath-main/src/config/db.js` and committed `.env` file with API keys.
**Learning:** Developers likely committed `.env` for convenience or lacked `.gitignore` configuration for the backend service. This exposes production credentials to anyone with repo access.
**Prevention:** Always use `dotenv` for secrets. Create `.gitignore` immediately upon project initialization. Use `.env.example` for templates. Scan commits for secrets before pushing.