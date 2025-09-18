# Repository instructions for Copilot

Purpose
- Backend for an Express + TypeScript API that provides authentication (JWT), user profiles, SQLite persistence, and Swagger docs.
- Use these instructions to assist with code changes, tests, docs, and developer workflows.

Primary languages & tools
- TypeScript, Node.js, Express
- SQLite (dev.sqlite), jwt (jsonwebtoken), bcryptjs
- Dev tools: ts-node-dev, swagger-ui-express, dotenv
- Diagrams: Mermaid in detailed.md

How to run locally (dev)
- cd to project root: /Users/supphakrit.t/Desktop/Project/workshop/GenerativeAI/temp-ai-workshop/express-ts-api
- Install: npm install
- Provide env (example `.env` exists): PORT=4000, JWT_SECRET set
- Start dev server: npm run dev
- Build: npm run build
- Start production: JWT_SECRET="..." PORT=4000 npm start

What to change and how
- Follow MVC structure in src/: models/, services/, controllers/, routes/, middleware/.
- When adding fields to the user model:
  - Update DB table creation SQL in src/models/userModel.ts.
  - Add migration helper (ensureUserColumns) or proper migration script.
  - Update service signatures, controller request parsing, and swagger.yml.
  - Preserve backward compatibility for login endpoints.
- When changing runtime behavior that depends on env vars, read from process.env at runtime (not module load).
- When updating routes, update swagger.yml and detailed.md (Mermaid) consistently.

Testing & verification
- Use curl or Swagger UI at /docs to validate endpoints.
- New features should include a minimal unit test if practical.
- Run TypeScript build to catch type errors before committing: npm run build

Docs & API spec
- swagger.yml is served at /swagger.yml; update it when API surface changes.
- detailed.md contains sequence and ER diagrams (Mermaid); update diagrams to reflect schema or flow changes.

Security & secrets
- Never commit secrets (.env credentials, JWT secret) or dev.sqlite containing private data.
- Add secrets to .gitignore and provide `.env.example` for dev defaults instead.
- Use bcrypt for password hashing and JWT for auth; keep JWT_SECRET strong.

Commit & PR guidelines
- Keep commits focused and atomic.
- Update README and swagger.yml for public API changes.
- If adding DB columns, document migration steps in the PR description.

Assistant behavior guidelines
- Ask clarifying questions when intent is ambiguous (what fields, public vs private, migration strategy).
- Provide code changes only in TypeScript/JS/Markdown and include filepaths.
- When suggesting code, include minimal, complete snippets and tests if applicable.
- Avoid exposing secrets or writing one-off scripts that embed credentials.
- Prefer small, incremental changes. If a large refactor is needed, propose a migration plan first.

Examples of good prompts
- "Add endpoint GET /users with pagination and update swagger.yml."
- "Migrate users table to add `membershipLevel` and provide a safe migration script."
- "Add middleware to require `admin` role on route X and update docs."

Examples of bad prompts
- "Push credentials in code."
- "Disable authentication for all routes."

If unsure, ask:
- Should this change be backwards-compatible?
- Should I add a migration helper or a full migration?
- Do you want tests and swagger updates included?

```// filepath: /Users/supphakrit.t/Desktop/Project/workshop/GenerativeAI/temp-ai-workshop/express-ts-api/copilot-instrction.md

# Repository instructions for Copilot

Purpose
- Backend for an Express + TypeScript API that provides authentication (JWT), user profiles, SQLite persistence, and Swagger docs.
- Use these instructions to assist with code changes, tests, docs, and developer workflows.

Primary languages & tools
- TypeScript, Node.js, Express
- SQLite (dev.sqlite), jwt (jsonwebtoken), bcryptjs
- Dev tools: ts-node-dev, swagger-ui-express, dotenv
- Diagrams: Mermaid in detailed.md

How to run locally (dev)
- cd to project root: /Users/supphakrit.t/Desktop/Project/workshop/GenerativeAI/temp-ai-workshop/express-ts-api
- Install: npm install
- Provide env (example `.env` exists): PORT=4000, JWT_SECRET set
- Start dev server: npm run dev
- Build: npm run build
- Start production:_SECRET="..." PORT=4000 npm start

What to change and how
- Follow MVC structure in src/: models/, services/, controllers/, routes/, middleware/.
- When adding fields to the user model:
  - Update DB table creation SQL in src/models/userModel.ts.
  - Add migration helper (ensureUserColumns) or proper migration script.
  - Update service signatures, controller request parsing, and swagger.yml.
  - Preserve backward compatibility for login endpoints.
- When changing runtime behavior that depends on env vars, read from process.env at runtime (not module load).
- When updating routes, update swagger.yml and detailed.md (Mermaid) consistently.

Testing & verification
- Use curl or Swagger UI at /docs to validate endpoints.
- New features should include a minimal unit test if practical.
- Run TypeScript build to catch type errors before committing: npm run build

Docs & API spec
- swagger.yml is served at /swagger.yml; update it when API surface changes.
- detailed.md contains sequence and ER diagrams (Mermaid); update diagrams to reflect schema or flow changes.

Security & secrets
- Never commit secrets (.env credentials, JWT secret) or dev.sqlite containing private data.
- Add secrets to .gitignore and provide `.env.example` for dev defaults instead.
- Use bcrypt for password hashing and JWT for auth; keep JWT_SECRET strong.

Commit & PR guidelines
- Keep commits focused and atomic.
- Update README and swagger.yml for public API changes.
- If adding DB columns, document migration steps in the PR description.

Assistant behavior guidelines
- Ask clarifying questions when intent is ambiguous (what fields, public vs private, migration strategy).
- Provide code changes only in TypeScript/JS/Markdown and include filepaths.
- When suggesting code, include minimal, complete snippets and tests if applicable.
- Avoid exposing secrets or writing one-off scripts that embed credentials.
- Prefer small, incremental changes. If a large refactor is needed, propose a migration plan first.

Examples of good prompts
- "Add endpoint GET /users with pagination and update swagger.yml."
- "Migrate users table to add `membershipLevel` and provide a safe migration script."
- "Add middleware to require `admin` role on route X and update docs."

Examples of bad prompts
- "Push credentials in code."
- "Disable authentication for all routes."

If unsure, ask:
- Should this change be backwards-compatible?
- Should I add a migration helper or a full migration?
- Do you want tests and swagger updates included?
