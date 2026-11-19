"use server";
import { requireAdmin } from "@/auth";
import { database } from "@/db";
import { siteSettings } from "@/db/schema";
import { parseSettingsForm } from "@/lib/settings-validation";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export type SettingsResult = { ok:boolean; message:string };
const defaultId = "00000000-0000-4000-8000-000000000001";
export async function saveSettings(_previous:SettingsResult, form:FormData):Promise<SettingsResult> {
  await requireAdmin();
  const parsed = parseSettingsForm(form);
  if (!parsed.success) return {ok:false,message:parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ"};
  const d=parsed.data;
  try {
    const db=database();
    const existing=await db.select({id:siteSettings.id}).from(siteSettings).limit(2);
    if (existing.length > 1) return {ok:false,message:"Có nhiều cấu hình website; cần xử lý dữ liệu trước khi cập nhật."};
    const sections={projects:d.showProjects,about:d.showAbout};
    const socialLinks={github:d.github,linkedin:d.linkedin};
    const model3d={enabled:d.show3d,quality:d.quality3d,motion:d.motion3d};
    const values={seoTitle:d.seoTitle || null,seoDescription:d.seoDescription || null,sections,socialLinks,model3d};
    const updates={seoTitle:values.seoTitle,seoDescription:values.seoDescription,sections:sql`${siteSettings.sections} || ${JSON.stringify(sections)}::jsonb`,socialLinks:sql`${siteSettings.socialLinks} || ${JSON.stringify(socialLinks)}::jsonb`,model3d:sql`${siteSettings.model3d} || ${JSON.stringify(model3d)}::jsonb`};
    if (existing[0]) await db.update(siteSettings).set(updates).where(eq(siteSettings.id,existing[0].id));
    else await db.insert(siteSettings).values({id:defaultId,...values}).onConflictDoUpdate({target:siteSettings.id,set:updates});
    revalidatePath("/"); revalidatePath("/admin");
    return {ok:true,message:"Đã lưu cấu hình."};
  } catch {return {ok:false,message:"Không thể lưu cấu hình. Vui lòng thử lại."};}
}
