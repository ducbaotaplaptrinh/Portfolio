import { z } from "zod";
const MIME_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
  video: ["video/mp4", "video/webm"],
  model3d: ["model/gltf-binary", "model/gltf+json"],
  document: ["application/pdf"],
} as const;
export const mediaSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  fileUrl: z.string().trim().min(1).max(2048).refine(value => {
    if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return true;
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  }, "URL phải là đường dẫn local hoặc HTTPS"),
  mimeType: z.string().trim().max(100),
  fileSize: z.preprocess(value => value === "" || value == null ? null : Number(value), z.number().int().nonnegative().max(104857600).nullable()),
  altText: z.string().trim().max(500).transform(value => value || null),
  assetType: z.enum(["image", "video", "model3d", "document"]),
}).superRefine((value, ctx) => {
  if (!(MIME_TYPES[value.assetType] as readonly string[]).includes(value.mimeType)) ctx.addIssue({code:"custom", path:["mimeType"], message:"MIME type không phù hợp với loại tài nguyên"});
});
