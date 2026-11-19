"use client";
export default function AdminError({reset}:{error:Error & {digest?:string}; reset:()=>void}) { return <main className="admin" role="alert"><h1>Không thể tải nội dung quản trị</h1><p>Vui lòng kiểm tra lại kết nối hoặc thử lại.</p><button onClick={reset}>Thử lại</button></main>; }
