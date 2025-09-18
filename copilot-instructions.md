# Repository Instructions — express-ts-api

Purpose

This folder implements a TypeScript + Express REST API used for workshop exercises and demos. It focuses on authentication and profile endpoints, uses SQLite for local development, and follows a layered architecture: routes → middleware → controllers → services → models. Keep changes small, typed, and testable.

Quick start

1. Change into the folder:

   cd express-ts-api

2. Install dependencies:

   npm install

3. Start the dev server (typical):

   npm run dev

   If there is no script, use:

   npx ts-node src/index.ts

Environment

Expected env vars (create a `.env` file):

PORT=3000
JWT_SECRET=replace_me
DATABASE_URL=sqlite:./dev.sqlite
NODE_ENV=development
BCRYPT_SALT_ROUNDS=10

What this repo contains

- `src/index.ts` — application bootstrap and middleware wiring
- `src/routes/*` — minimal route definitions only
- `src/controllers/*` — HTTP boundary, parse/validate input, return responses
- `src/services/*` — business logic, pure functions where possible
- `src/models/*` — DB access (SQLite), single-responsibility persistence methods
- `src/middleware/authMiddleware.ts` — verify token, attach `req.user`
- `swagger.yml` — OpenAPI contract; keep in sync with routes

Conventions and best practices

- Use TypeScript with explicit return types for exported functions.
- Controllers should be thin: parse, validate, call services, and send responses.
- Services contain business logic and are unit-testable without Express.
- Centralize config and env access (consider `src/config/`).
- Use `async/await` and a centralized error handler (e.g., `asyncHandler` wrapper).
- Validate inputs (Zod/Joi recommended) before calling services.
- Never log secrets or raw tokens; strip `passwordHash` from responses.
- Prefer constants over magic numbers and keep functions small and focused.

Auth pattern (expected)

- Register: hash password and store user.
- Login: verify password, return short-lived JWT.
- Protected routes: `Authorization: Bearer <token>`.
- Future: refresh token endpoint, rotating refresh tokens.

Testing

- Unit tests for services (mock models).
- Integration tests for auth flow and protected routes (Supertest).
- Use ephemeral/in-memory SQLite or a test DB file for integration tests.

How to ask Copilot for changes (examples)

- "Add a refresh token endpoint and rotate refresh tokens on use. Update authService and authMiddleware accordingly."
- "Create Zod schemas for registration and login and validate input in authController."
- "Refactor authController to use an `asyncHandler(fn)` wrapper and remove duplicated try/catch blocks."

Error handling mapping

- Validation errors → 400
- Auth failure → 401
- Forbidden → 403
- Not found → 404
- Conflict (duplicate) → 409
- Server errors → 500 (log stack in server logs)

If something is ambiguous

Assume a conventional Express + TypeScript layout. When generating code, prefer adding small utility modules (e.g., `src/lib/token.ts`, `src/lib/password.ts`) rather than embedding logic directly in controllers. Flag unknowns in a comment (e.g., "ASSUMPTION: using JWT with HS256 and `process.env.JWT_SECRET`").

Commit style

- `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`, `docs: ...`, `test: ...`

Contact / Next steps

If you want, I can:
- Create example Zod validation schemas.
- Add an `asyncHandler` wrapper and simple error classes.
