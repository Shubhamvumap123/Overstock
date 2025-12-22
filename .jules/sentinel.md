## 2024-05-22 - [Exposed Secrets in .env]
**Vulnerability:** Hardcoded `SECRET_KEY`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` found in committed `authentication_Oath-main/.env` file.
**Learning:** Even if a file is typically ignored (like `.env`), it can be accidentally committed if not explicitly added to `.gitignore` before the first commit.
**Prevention:** Always initialize a repo with a standard `.gitignore` template for the language/framework being used. Use tools like `git-secrets` or pre-commit hooks to scan for high-entropy strings or known key patterns before allowing a commit.
