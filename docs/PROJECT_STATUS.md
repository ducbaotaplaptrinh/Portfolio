# Project status

Base: `7abe4f7` on `main`. This document describes the changes on `feat/portfolio-cms-foundation`; obtain the exact current commit with `git rev-parse HEAD`.

## Completed in this branch

- Added CI for npm ci, lint, TypeScript, unit tests and build.
- Separated public database reads and error UI: missing configuration or query failure is not displayed as an empty portfolio.
- Added explicit JWT session strategy and pure allowlist/verified-email checks, with unit tests. Every existing project write action checks authorization on the server.
- Added project edit, case-study content, status, featured and ordering fields; published case-study route and metadata. The public query filters published status.
- Added server-authorized profile editing and skill create/update/delete with Zod validation. URL fields accept only HTTP(S).
- Added experience and education create/update/delete forms with Zod date validation, server-side authorization and five unit tests on a separate follow-up branch.
- Added migration 0001 with database checks for project/message status, media type and file size, and project dates. The initial migration is unchanged.

## Verification and blockers

- `npm ci`: PASS (4 moderate development dependency advisories reported).
- Unit tests: PASS, 6 tests; these test validation and authorization predicates, not the live OAuth or server-action boundary.
- Lint: PASS with an existing image optimization warning. Typecheck: PASS after build. Production webpack build: PASS. Check current PR CI for remote results.
- Database migration: two migrations applied to Neon production with explicit user approval; 14 tables and the empty public homepage were verified read-only. CRUD, unique constraints, rollback and visibility integration: SKIPPED; no isolated PostgreSQL URL is configured and Docker daemon is unavailable.
- Google OAuth, expired sessions, CSRF and live action authorization: SKIPPED; AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET and ADMIN_EMAILS are not configured. JWT remains in place; there is no demonstrated need to migrate sessions to Drizzle Adapter. Existing adapter tables are unused.
- Mobile, WebGL fallback and Hallmark render audit: SKIPPED on this branch; 3D has not been changed. Previous Hallmark Hero review reported failures.
- Never use production for write tests; review existing data before migration 0001, back up and test restore, and get explicit authorization before any production migration.

## Remaining work / next agent

- Finish project pagination, images, skills association, transactions and clear mutation error UI; complete profile, skills, experience and education usability/integration tests; add CRUD for media, settings and contact messages. No public contact endpoint exists yet; implement shared, durable rate limiting before adding one.
- Add isolated PostgreSQL integration tests and CI service, including migration from empty, constraint checks, rollback and authorization/visibility. Provide disposable `DATABASE_URL` and OAuth test credentials separately.
- Add backup/restore drills, storage provider integration, SEO settings, project images, accessibility/performance checks, Hallmark fixes and responsive testing. Do not seed invented portfolio data.
- `updated_at` is maintained by Drizzle's `$onUpdate` for ORM updates, not arbitrary SQL. Consider a database trigger if other writers are introduced.
