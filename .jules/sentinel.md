## 2024-02-14 - Hardcoded Secrets & Sensitive Logging
**Vulnerability:** Hardcoded MongoDB connection strings (with credentials) and Google OAuth secrets were found in source code. Additionally, sensitive user tokens were being logged to the console.
**Learning:** Developers might commit secrets if `.env` files are tracked or if they test with hardcoded values and forget to remove them. Sensitive logging is often left behind from debugging.
**Prevention:**
1. Always use `.gitignore` to exclude `.env` files.
2. Use `.env.example` templates to document required variables without values.
3. Use a pre-commit hook or linter (like `git-secrets` or `trufflehog`) to scan for secrets.
4. Review logs during code review to ensure no sensitive data is printed.
