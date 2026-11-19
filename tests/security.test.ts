import { test } from "node:test";
import assert from "node:assert/strict";
import { canSignIn, isAllowedEmail } from "../src/lib/authorization";
import { projectSchema } from "../src/lib/project-validation";
test("allowlist denies missing, unrelated and revoked accounts", () => {
  assert.equal(isAllowedEmail("owner@example.com", undefined), false);
  assert.equal(isAllowedEmail("owner@example.com", "other@example.com"), false);
  assert.equal(isAllowedEmail("owner@example.com", " OWNER@example.com,other@example.com "), true);
  assert.equal(isAllowedEmail("owner@example.com", "other@example.com"), false);
});
test("Google sign-in requires a verified allowlisted email", () => {
  assert.equal(canSignIn("owner@example.com", true, "owner@example.com"), true);
  assert.equal(canSignIn("owner@example.com", false, "owner@example.com"), false);
  assert.equal(canSignIn("owner@example.com", "true", "owner@example.com"), false);
  assert.equal(canSignIn("attacker@example.com", true, "owner@example.com"), false);
});
test("project validation rejects invalid slugs and unpublished status values", () => {
  const valid = {title:"Real project", slug:"real-project", summary:"Summary", status:"draft"};
  assert.equal(projectSchema.safeParse(valid).success, true);
  assert.equal(projectSchema.safeParse({...valid, slug:"../bad"}).success, false);
  assert.equal(projectSchema.safeParse({...valid, status:"public"}).success, false);
  assert.equal(projectSchema.safeParse({...valid, title:" "}).success, false);
});
