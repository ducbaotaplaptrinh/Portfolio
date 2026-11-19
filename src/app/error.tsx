"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="admin" role="alert"><h1>Không thể tải portfolio</h1><p>Dữ liệu hiện không khả dụng. Vui lòng thử lại sau.</p><button onClick={reset}>Thử lại</button></main>;
}
