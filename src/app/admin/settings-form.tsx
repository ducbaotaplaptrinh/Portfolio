"use client";
import { useActionState, useState } from "react";
import HeroScene from "@/components/hero-scene";
import type { siteSettings } from "@/db/schema";
import { saveSettings } from "./settings-actions";
type Settings=typeof siteSettings.$inferSelect;
export function SettingsForm({settings}:{settings?:Settings}) {
  const [state, action, pending]=useActionState(saveSettings,{ok:false,message:""});
  const [show3d, setShow3d]=useState(settings?.model3d?.enabled !== false);
  const initialQuality = settings?.model3d?.quality === "low" || settings?.model3d?.quality === "high" ? settings.model3d.quality : "auto";
  const [quality, setQuality]=useState<"auto"|"low"|"high">(initialQuality);
  const [motion,setMotion]=useState(settings?.model3d?.motion !== false);
  return <section><h2>Cấu hình website</h2><p>Những thay đổi này ảnh hưởng trang công khai.</p><form action={action} className="admin-form">
    <label>Tiêu đề SEO<input name="seoTitle" maxLength={150} defaultValue={settings?.seoTitle ?? ""}/></label>
    <label>Mô tả SEO<textarea name="seoDescription" maxLength={300} defaultValue={settings?.seoDescription ?? ""}/></label>
    <label>GitHub (HTTPS)<input name="github" type="url" defaultValue={settings?.socialLinks?.github ?? ""}/></label>
    <label>LinkedIn (HTTPS)<input name="linkedin" type="url" defaultValue={settings?.socialLinks?.linkedin ?? ""}/></label>
    <label><input type="checkbox" name="showProjects" defaultChecked={settings?.sections?.projects !== false}/> Hiển thị dự án</label>
    <label><input type="checkbox" name="showAbout" defaultChecked={settings?.sections?.about !== false}/> Hiển thị giới thiệu</label>
    <label><input type="checkbox" name="show3d" checked={show3d} onChange={event => setShow3d(event.target.checked)}/> Hiển thị Hero 3D</label>
    <label>Chất lượng 3D<select name="quality3d" value={quality} onChange={event => setQuality(event.target.value as "auto"|"low"|"high")}><option value="auto">Tự động</option><option value="low">Tiết kiệm</option><option value="high">Chi tiết hơn</option></select></label>
    <label>Chuyển động<select name="motion3d" value={motion ? "on" : "off"} onChange={event => setMotion(event.target.value === "on")}><option value="on">Bật</option><option value="off">Tắt</option></select></label>
    <button disabled={pending}>{pending ? "Đang lưu…" : "Lưu cấu hình"}</button>{state.message && <p role="status">{state.message}</p>}
  </form><div className="settings-preview"><h3>Xem trước Hero</h3>{show3d ? <HeroScene quality={quality} motion={motion}/> : <p>Cảnh 3D đã tắt. Trang chủ sẽ hiển thị hình tĩnh.</p>}</div></section>;
}
