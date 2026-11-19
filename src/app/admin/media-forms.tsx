"use client";
import { useActionState } from "react";
import type { mediaAssets } from "@/db/schema";
import { saveMedia, deleteMedia } from "./media-actions";
type Asset = typeof mediaAssets.$inferSelect;
const initial = {ok:false,message:""};
function MediaForm({asset}:{asset?:Asset}) {
  const [state, action, pending] = useActionState(saveMedia, initial);
  return <form action={action} className="admin-form">{asset && <input type="hidden" name="id" value={asset.id}/>}
    <label>Tên tệp<input name="fileName" required maxLength={255} defaultValue={asset?.fileName ?? ""}/></label>
    <label>URL HTTPS hoặc đường dẫn trong public<input name="fileUrl" required maxLength={2048} defaultValue={asset?.fileUrl ?? ""}/></label>
    <label>Loại<select name="assetType" defaultValue={asset?.assetType ?? "image"}><option value="image">Ảnh</option><option value="video">Video</option><option value="model3d">Mô hình 3D</option><option value="document">Tài liệu PDF</option></select></label>
    <label>MIME type<input name="mimeType" required placeholder="image/jpeg" defaultValue={asset?.mimeType ?? ""}/></label>
    <label>Kích thước (byte, tối đa 100 MiB)<input name="fileSize" type="number" min="0" max="104857600" defaultValue={asset?.fileSize ?? ""}/></label>
    <label>Văn bản thay thế<input name="altText" maxLength={500} defaultValue={asset?.altText ?? ""}/></label>
    <button disabled={pending}>{pending ? "Đang lưu…" : asset ? "Lưu tài nguyên" : "Thêm tài nguyên"}</button>{state.message && <p role="status">{state.message}</p>}
  </form>;
}
function DeleteMedia({id}:{id:string}) { const [state,action,pending] = useActionState(deleteMedia,initial); return <form action={action}><input type="hidden" name="id" value={id}/><label><input type="checkbox" name="confirm" value="yes" required/> Xác nhận xóa metadata</label><button disabled={pending}>Xóa metadata</button>{state.message && <p role="status">{state.message}</p>}</form>; }
export function MediaForms({items}:{items:Asset[]}) { return <section><h2>Thư viện tài nguyên</h2><p>Chỉ lưu thông tin và liên kết; tệp phải có sẵn trong public hoặc storage riêng. MIME type và kích thước do người quản trị cung cấp, chưa được xác minh từ tệp.</p><details><summary>Định dạng được hỗ trợ</summary><p>Ảnh: JPEG, PNG, WebP, AVIF, GIF. Video: MP4, WebM. Mô hình: GLB, glTF. Tài liệu: PDF.</p></details><h3>Thêm tài nguyên</h3><MediaForm/>{items.length === 0 && <p>Chưa có tài nguyên.</p>}{items.map(item=><article key={item.id}><h3>{item.fileName}</h3><MediaForm asset={item}/><DeleteMedia id={item.id}/></article>)}</section>; }
