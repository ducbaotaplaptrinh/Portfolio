import { test } from "node:test";
import assert from "node:assert/strict";
import { hasDatabaseUrl } from "../src/db/config";
test("database configuration is absent for undefined, empty, or whitespace values", () => {
  assert.equal(hasDatabaseUrl(undefined), false);
  assert.equal(hasDatabaseUrl(""), false);
  assert.equal(hasDatabaseUrl("  "), false);
  assert.equal(hasDatabaseUrl("postgresql://example"), true);
});
