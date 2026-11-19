"use client";
import { useActionState } from "react";
import type { siteSettings } from "@/db/schema";
import { saveSettings } from "./settings-actions";
type Settings = typeof siteSettings.$inferSelect;
export function SettingsForm({settings}:{settings?:Settings}) {
  const [state, action, pending] = useActionState(saveSettings, {ok:false,message:""});
  return <section><h2>Cấu hình website</h2><p>Những thay đổi này ảnh hưởng trang công khai.</p><form action={action} className="admin-form">
    <label>Tiêu đề SEO<input name="seoTitle" maxLength={150} defaultValue={settings?.seoTitle ?? ""}/></label>
    <label>Mô tả SEO<textarea name="seoDescription" maxLength={300} defaultValue={settings?.seoDescription ?? ""}/></label>
    <label>GitHub (HTTPS)<input name="github" type="url" defaultValue={settings?.socialLinks?.github ?? ""}/></label>
    <label>LinkedIn (HTTPS)<input name="linkedin" type="url" defaultValue={settings?.socialLinks?.linkedin ?? ""}/></label>
    <label><input type="checkbox" name="showProjects" defaultChecked={settings?.sections?.projects !== false}/> Hiển thị dự án</label>
    <label><input type="checkbox" name="showAbout" defaultChecked={settings?.sections?.about !== false}/> Hiển thị giới thiệu</label>
    <button disabled={pending}>{pending ? "Đang lưu…" : "Lưu cấu hình"}</button>{state.message && <p role="status">{state.message}</p>}
  </form></section>;
}
