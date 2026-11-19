# Kiểm kê nội dung portfolio

Kiểm tra chỉ đọc Neon production ngày 19/11/2026. Không lưu thông tin đăng nhập hoặc dữ liệu riêng trong tài liệu này. “Ready” chỉ xác nhận có trường dữ liệu, không khẳng định nội dung đã được chủ sở hữu duyệt.

| Nội dung | Hiện có | Trạng thái | Cần bổ sung / nguồn xác minh |
|---|---|---|---|
| Profile | 1 hồ sơ có họ tên | Cần xác minh (không có trạng thái draft) | Chủ sở hữu xác minh tên; bổ sung headline, giới thiệu, địa điểm, email, avatar, GitHub, LinkedIn và CV nếu muốn công khai. |
| Skills | 0 | Thiếu | Danh sách kỹ năng và nhóm thực tế do chủ sở hữu cung cấp. |
| Projects | 0 | Thiếu | Tên, mô tả, vai trò, hình ảnh, công nghệ, liên kết được phép công khai và case study thực tế. Nhập dưới dạng draft trước khi duyệt. |
| Experience | 0 | Thiếu | Tổ chức, vị trí, thời gian và mô tả được chủ sở hữu xác nhận. |
| Education | 0 | Thiếu | Trường, ngành, bằng cấp và thời gian được chủ sở hữu xác nhận. |
| Media | 0 | Thiếu | Ảnh, CV và tài nguyên có quyền sử dụng; hiện CMS chỉ lưu URL/metadata. |
| Site settings | 0 | Mặc định | Chủ sở hữu xác nhận SEO, liên kết và lựa chọn hiển thị. |

## Nhập nội dung

1. Đăng nhập `/admin` bằng tài khoản Google trong `ADMIN_EMAILS`.
2. Nhập hồ sơ, kỹ năng, kinh nghiệm và học vấn từ thông tin đã xác minh.
3. Thêm dự án ở trạng thái **Bản nháp**; kiểm tra nội dung và quyền công khai trước khi chọn **Công khai**.
4. Thêm metadata tài nguyên bằng URL HTTPS hoặc đường dẫn local hợp lệ; hệ thống chưa upload hoặc kiểm tra tệp gốc.
5. Trong **Cấu hình website**, kiểm tra tiêu đề SEO, liên kết và các mục hiển thị.

Chưa có dữ liệu mẫu được ghi vào production. Project media/skill relations, preview case study và kiểm thử CRUD trên database test vẫn cần hoàn thiện.
