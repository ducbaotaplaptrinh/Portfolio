"use server";
import { requireAdmin } from "@/auth";
import { database } from "@/db";
import { mediaAssets } from "@/db/schema";
import { mediaSchema } from "@/lib/media-validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
export type MediaResult = { message: string; ok: boolean };
export async function saveMedia(_previous: MediaResult, form: FormData): Promise<MediaResult> {
  await requireAdmin();
  const parsed = mediaSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return {ok:false, message:parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ"};
  const rawId = form.get("id");
  const id = rawId ? z.string().uuid().safeParse(rawId) : null;
  if (id && !id.success) return {ok:false, message:"Mã tài nguyên không hợp lệ"};
  try {
    if (id?.success) {
      const rows = await database().update(mediaAssets).set(parsed.data).where(eq(mediaAssets.id,id.data)).returning({id:mediaAssets.id});
      if (!rows.length) return {ok:false, message:"Không tìm thấy tài nguyên"};
    } else await database().insert(mediaAssets).values(parsed.data);
    revalidatePath("/admin");
    return {ok:true, message:"Đã lưu thông tin tài nguyên"};
  } catch { return {ok:false, message:"Không thể lưu. Vui lòng thử lại."}; }
}
export async function deleteMedia(_previous: MediaResult, form: FormData): Promise<MediaResult> {
  await requireAdmin();
  const id = z.string().uuid().safeParse(form.get("id"));
  if (!id.success || form.get("confirm") !== "yes") return {ok:false, message:"Hãy xác nhận xóa tài nguyên"};
  try {
    const rows = await database().delete(mediaAssets).where(eq(mediaAssets.id,id.data)).returning({id:mediaAssets.id});
    if (!rows.length) return {ok:false, message:"Không tìm thấy tài nguyên"};
    revalidatePath("/admin");
    return {ok:true, message:"Đã xóa metadata. Tệp gốc không bị xóa."};
  } catch { return {ok:false, message:"Không thể xóa. Vui lòng thử lại."}; }
}
