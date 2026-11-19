import Link from "next/link";

/** A missing database is a setup state, not an empty portfolio. */
export default function DatabaseSetup() {
  return <main className="admin" role="status"><Link href="/">Portfolio</Link><h1>Portfolio chưa được thiết lập</h1><p>Dữ liệu chưa khả dụng vì cơ sở dữ liệu chưa được cấu hình.</p><p>Nếu bạn là chủ website, hãy cấu hình DATABASE_URL trên máy chủ và khởi động lại ứng dụng.</p></main>;
}
