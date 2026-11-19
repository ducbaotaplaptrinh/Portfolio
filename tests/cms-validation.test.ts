import { test } from "node:test";
import assert from "node:assert/strict";
import { profileSchema, skillSchema } from "../src/lib/cms-validation";
const profile = {fullName:"A", headline:"", bio:"", location:"", email:"", avatarUrl:"", githubUrl:"", linkedinUrl:"", resumeUrl:""};
test("profile validation allows empty optional fields and rejects unsafe URLs", () => {
  assert.equal(profileSchema.safeParse(profile).success, true);
  assert.equal(profileSchema.safeParse({...profile, githubUrl:"javascript:alert(1)"}).success, false);
  assert.equal(profileSchema.safeParse({...profile, email:"invalid"}).success, false);
});
test("skills require a valid slug and non-negative order", () => {
  const skill = {name:"TypeScript", slug:"typescript", category:"Languages", iconUrl:"", displayOrder:"0"};
  assert.equal(skillSchema.safeParse(skill).success, true);
  assert.equal(skillSchema.safeParse({...skill, slug:"../invalid"}).success, false);
  assert.equal(skillSchema.safeParse({...skill, displayOrder:"-1"}).success, false);
});
