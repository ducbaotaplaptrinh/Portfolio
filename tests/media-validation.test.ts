import { test } from "node:test";
import assert from "node:assert/strict";
import { mediaSchema } from "../src/lib/media-validation";
const image = {fileName:"portrait.png",fileUrl:"/portrait.png",mimeType:"image/png",fileSize:"100",altText:"Portrait",assetType:"image"};
test("media accepts local and HTTPS assets and parses optional size",()=>{
  assert.equal(mediaSchema.safeParse(image).success,true);
  assert.equal(mediaSchema.safeParse({...image,fileUrl:"https://example.com/image.png",fileSize:""}).success,true);
});
test("media rejects unsafe links, mismatched MIME, and invalid sizes",()=>{
  for (const fileUrl of ["javascript:alert(1)","//evil.example/image.png","http://example.com/x"]) assert.equal(mediaSchema.safeParse({...image,fileUrl}).success,false);
  assert.equal(mediaSchema.safeParse({...image,mimeType:"application/pdf"}).success,false);
  assert.equal(mediaSchema.safeParse({...image,fileSize:"-1"}).success,false);
  assert.equal(mediaSchema.safeParse({...image,fileSize:"104857601"}).success,false);
});
