import { test } from "node:test";
import assert from "node:assert/strict";
import { parseProjectFilters, projectPageUrl } from "../src/lib/project-query";
test("project filters normalize invalid params and limit search",()=>{assert.deepEqual(parseProjectFilters({q:"  test  ",status:"draft",page:"2"}),{query:"test",status:"draft",page:2});assert.deepEqual(parseProjectFilters({q:["x"],status:"bad",page:"-2"}),{query:"",status:"all",page:1});assert.equal(parseProjectFilters({q:"x".repeat(120)}).query.length,100);});
test("page links preserve encoded filters",()=>{assert.equal(projectPageUrl({query:"C++ & SQL",status:"published",page:1},2),"/admin?q=C%2B%2B+%26+SQL&status=published&page=2#projects");});
