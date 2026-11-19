import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSettingsForm } from "../src/lib/settings-validation";
function form() { const f=new FormData(); f.set("seoTitle","Portfolio"); f.set("seoDescription",""); f.set("github","https://github.com/example"); f.set("linkedin",""); f.set("showProjects","on"); return f; }
test("settings parse explicit section flags and optional URLs",()=>{const result=parseSettingsForm(form()); assert.equal(result.success,true); if(result.success){assert.equal(result.data.showProjects,true); assert.equal(result.data.showAbout,false); assert.equal(result.data.show3d,false);}});
test("settings reject unsafe URLs and oversized SEO text",()=>{const f=form(); f.set("github","javascript:alert(1)"); assert.equal(parseSettingsForm(f).success,false); f.set("github",""); f.set("seoTitle","a".repeat(151)); assert.equal(parseSettingsForm(f).success,false);});
test("settings reject unsupported 3D quality",()=>{const f=form(); f.set("quality3d","ultra"); assert.equal(parseSettingsForm(f).success,false); f.set("quality3d","low"); f.set("motion3d","off"); const result=parseSettingsForm(f); assert.equal(result.success,true); if(result.success){assert.equal(result.data.quality3d,"low"); assert.equal(result.data.motion3d,false);}});

test("settings reject unsupported 3D motion",()=>{const f=form();f.set("motion3d","unexpected");assert.equal(parseSettingsForm(f).success,false);});
