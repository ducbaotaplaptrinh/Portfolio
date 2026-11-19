import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSettingsForm } from "../src/lib/settings-validation";
function form() { const f=new FormData(); f.set("seoTitle","Portfolio"); f.set("seoDescription",""); f.set("github","https://github.com/example"); f.set("linkedin",""); f.set("showProjects","on"); return f; }
test("settings parse explicit section flags and optional URLs",()=>{const result=parseSettingsForm(form()); assert.equal(result.success,true); if(result.success){assert.equal(result.data.showProjects,true); assert.equal(result.data.showAbout,false);}});
test("settings reject unsafe URLs and oversized SEO text",()=>{const f=form(); f.set("github","javascript:alert(1)"); assert.equal(parseSettingsForm(f).success,false); f.set("github",""); f.set("seoTitle","a".repeat(151)); assert.equal(parseSettingsForm(f).success,false);});
