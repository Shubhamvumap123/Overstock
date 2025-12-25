## 2024-12-25 - Hardcoded Secrets in Configuration
**Vulnerability:** Hardcoded MongoDB connection string with credentials found in `Authentication/src/configs/db.js`.
**Learning:** Even if `dotenv` is installed, it doesn't mean it's being used. Secrets are often hardcoded in early development and forgotten.
**Prevention:** Always use environment variables for secrets from the start. Add `.env` to `.gitignore` immediately. Audit `config` folders for secrets.
