import type { education, experiences } from "@/db/schema";
import { deleteEducation, deleteExperience, saveEducation, saveExperience } from "./timeline-actions";

type Experience = typeof experiences.$inferSelect;
type Education = typeof education.$inferSelect;

function ExperienceFields({ item }: { item?: Experience }) {
  return (
    <>
      {item && <input type="hidden" name="id" value={item.id} />}
      <label>Công ty / tổ chức
        <input name="company" required maxLength={200} defaultValue={item?.company ?? ""} />
      </label>
      <label>Vị trí
        <input name="position" required maxLength={200} defaultValue={item?.position ?? ""} />
      </label>
      <label>Loại công việc
        <input name="employmentType" maxLength={100} defaultValue={item?.employmentType ?? ""} />
      </label>
      <label>Địa điểm
        <input name="location" maxLength={200} defaultValue={item?.location ?? ""} />
      </label>
      <label>Ngày bắt đầu
        <input name="startDate" type="date" defaultValue={item?.startDate ?? ""} />
      </label>
      <label>Ngày kết thúc (để trống nếu đang làm)
        <input name="endDate" type="date" defaultValue={item?.endDate ?? ""} />
      </label>
      <label>
        <input name="isCurrent" type="checkbox" defaultChecked={item?.isCurrent ?? false} />
        Đang làm việc tại đây
      </label>
      <label>Mô tả công việc
        <textarea name="description" maxLength={10000} defaultValue={item?.description ?? ""} />
      </label>
      <label>Thứ tự hiển thị
        <input name="displayOrder" type="number" min="0" max="100000" defaultValue={item?.displayOrder ?? 0} />
      </label>
    </>
  );
}

export function ExperienceForms({ items }: { items: Experience[] }) {
  return (
    <section aria-labelledby="admin-experience-title">
      <h2 id="admin-experience-title">Kinh nghiệm làm việc</h2>
      <p>Chỉ nhập thông tin thực tế. Nếu đánh dấu đang làm việc, để trống ngày kết thúc.</p>
      <form action={saveExperience} className="admin-form">
        <ExperienceFields />
        <button type="submit">Thêm kinh nghiệm</button>
      </form>
      {items.length === 0 && <p>Chưa có kinh nghiệm nào được nhập.</p>}
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.position}, {item.company}</h3>
          <form action={saveExperience} className="admin-form">
            <ExperienceFields item={item} />
            <button type="submit">Lưu kinh nghiệm</button>
          </form>
          <form action={deleteExperience}>
            <input type="hidden" name="id" value={item.id} />
            <button type="submit">Xóa kinh nghiệm</button>
          </form>
        </div>
      ))}
    </section>
  );
}

function EducationFields({ item }: { item?: Education }) {
  return (
    <>
      {item && <input type="hidden" name="id" value={item.id} />}
      <label>Trường / cơ sở đào tạo
        <input name="institution" required maxLength={200} defaultValue={item?.institution ?? ""} />
      </label>
      <label>Bằng cấp
        <input name="degree" maxLength={200} defaultValue={item?.degree ?? ""} />
      </label>
      <label>Chuyên ngành
        <input name="fieldOfStudy" maxLength={200} defaultValue={item?.fieldOfStudy ?? ""} />
      </label>
      <label>Ngày bắt đầu
        <input name="startDate" type="date" defaultValue={item?.startDate ?? ""} />
      </label>
      <label>Ngày kết thúc (có thể để trống)
        <input name="endDate" type="date" defaultValue={item?.endDate ?? ""} />
      </label>
      <label>Mô tả
        <textarea name="description" maxLength={10000} defaultValue={item?.description ?? ""} />
      </label>
    </>
  );
}

export function EducationForms({ items }: { items: Education[] }) {
  return (
    <section aria-labelledby="admin-education-title">
      <h2 id="admin-education-title">Học vấn</h2>
      <form action={saveEducation} className="admin-form">
        <EducationFields />
        <button type="submit">Thêm học vấn</button>
      </form>
      {items.length === 0 && <p>Chưa có thông tin học vấn.</p>}
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.institution}</h3>
          <form action={saveEducation} className="admin-form">
            <EducationFields item={item} />
            <button type="submit">Lưu học vấn</button>
          </form>
          <form action={deleteEducation}>
            <input type="hidden" name="id" value={item.id} />
            <button type="submit">Xóa học vấn</button>
          </form>
        </div>
      ))}
    </section>
  );
}
