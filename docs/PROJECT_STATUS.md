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
- Google OAuth configuration is present and the user reports successful sign-in. Expired sessions, CSRF and live action authorization: SKIPPED. JWT remains in place; there is no demonstrated need to migrate sessions to Drizzle Adapter. Existing adapter tables are unused.
- Mobile, WebGL fallback and Hallmark render audit: SKIPPED on this branch; 3D has not been changed. Previous Hallmark Hero review reported failures.
- Never use production for write tests; review existing data before migration 0001, back up and test restore, and get explicit authorization before any production migration.

## Remaining work / next agent

- Finish project pagination, images, skills association, transactions and clear mutation error UI; complete profile, skills, experience and education usability/integration tests; add CRUD for media, settings and contact messages. No public contact endpoint exists yet; implement shared, durable rate limiting before adding one.
- Add isolated PostgreSQL integration tests and CI service, including migration from empty, constraint checks, rollback and authorization/visibility. Provide disposable `DATABASE_URL` and OAuth test credentials separately.
- Add backup/restore drills, storage provider integration, SEO settings, project images, accessibility/performance checks, Hallmark fixes and responsive testing. Do not seed invented portfolio data.
- `updated_at` is maintained by Drizzle's `$onUpdate` for ORM updates, not arbitrary SQL. Consider a database trigger if other writers are introduced.

## Admin integration branch (based on PR #2)

- Added admin navigation and overview counts based on live projects, skills, experiences and education, plus loading and error states. The dashboard has no activity feed because no audit log exists.
- User reported successful Google sign-in using an allowlisted account. Logout, expiry, rejection and server-action HTTP authorization still need direct verification.
- Neon production read-only check: 14 tables and two migrations; it contains a profile and no projects. No production writes or migrations were performed in this phase. Integration tests requiring writes remain blocked until an isolated test database is provided.
- Local checks on this branch: 11 unit tests pass; lint has one existing image warning. Check PR CI for the final build result. Responsive dashboard and authenticated browser testing remain outstanding.
- Next: test dashboard with a real authenticated browser session, complete module error feedback and deletion confirmation, then project pagination and relations. Do not use production for test writes. PR #3 depends on PR #2, which depends on PR #1.

## Media metadata follow-up

- Added authorized create, edit and confirmed delete of media metadata with validation, feedback and empty state. Only existing local paths or HTTPS URLs are stored; no binaries are uploaded or deleted. Allowed MIME types and declared file size are validated, but the remote file itself is not inspected.
- Unit tests validate accepted paths and MIME/size rejection. Production write/CRUD and authorization integration tests remain SKIPPED until an isolated test database is configured.
- Next: test authenticated media CRUD against a disposable database, add a storage provider if upload is required, connect asset selection to projects/profile, then implement settings and contact with durable rate limiting.

## Site settings follow-up

- Added authenticated settings editing for SEO title/description, HTTPS GitHub and LinkedIn links, project/about visibility and 3D enablement; public homepage consumes these settings. Unknown JSON settings keys are retained during updates.
- Defaults preserve existing behavior when no settings row exists. The editor refuses to save when multiple rows already exist; an existing database-wide singleton constraint is not present, so concurrent writers outside this action may still create duplicates. Theme, contact and broader 3D configuration remain TODO.
- Unit tests cover form parsing and invalid URLs. Database writes, authenticated save, and rendered visibility tests are SKIPPED until an isolated database is available. No production writes or migrations were performed.

## Project list follow-up

- Added authenticated server-side title search, status filter and pagination (10 per page), with stable ordering and separate unfiltered overview count. Added explicit confirmation checked by the server before project deletion.
- Unit tests cover filter normalization and encoded pagination links. The database-backed filtered list, delete authorization/confirmation and authenticated responsive UI remain untested against a separate test database. A direct CLI attempt to import the server-only query was blocked by module resolution; this is not counted as an integration pass. No production records were modified.
- Project image associations, skills relations, edit error feedback and integration testing remain TODO.
