import type { profiles, skills } from "@/db/schema";
import { deleteSkill, saveProfile, saveSkill } from "./content-actions";
type Profile = typeof profiles.$inferSelect;
type Skill = typeof skills.$inferSelect;
export function ProfileForm({profile}:{profile?: Profile}) {
  return <section><h2>Hồ sơ</h2><form action={saveProfile} className="admin-form">{profile && <input type="hidden" name="id" value={profile.id}/>}
    <label>Họ tên<input name="fullName" required maxLength={200} defaultValue={profile?.fullName ?? ""}/></label>
    <label>Tiêu đề<input name="headline" defaultValue={profile?.headline ?? ""}/></label><label>Giới thiệu<textarea name="bio" defaultValue={profile?.bio ?? ""}/></label>
    <label>Địa điểm<input name="location" defaultValue={profile?.location ?? ""}/></label><label>Email<input name="email" type="email" defaultValue={profile?.email ?? ""}/></label>
    <label>URL ảnh đại diện<input name="avatarUrl" type="url" defaultValue={profile?.avatarUrl ?? ""}/></label><label>GitHub<input name="githubUrl" type="url" defaultValue={profile?.githubUrl ?? ""}/></label>
    <label>LinkedIn<input name="linkedinUrl" type="url" defaultValue={profile?.linkedinUrl ?? ""}/></label><label>URL CV<input name="resumeUrl" type="url" defaultValue={profile?.resumeUrl ?? ""}/></label><button>Lưu hồ sơ</button>
  </form></section>;
}
function SkillFields({skill}:{skill?:Skill}) { return <>{skill && <input type="hidden" name="id" value={skill.id}/>}<label>Tên kỹ năng<input name="name" required defaultValue={skill?.name ?? ""}/></label><label>Slug<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={skill?.slug ?? ""}/></label><label>Nhóm<input name="category" required defaultValue={skill?.category ?? ""}/></label><label>URL biểu tượng<input name="iconUrl" type="url" defaultValue={skill?.iconUrl ?? ""}/></label><label>Thứ tự<input name="displayOrder" type="number" min="0" defaultValue={skill?.displayOrder ?? 0}/></label></>; }
export function SkillsForms({items}:{items:Skill[]}) { return <section><h2>Kỹ năng</h2><form action={saveSkill} className="admin-form"><SkillFields/><button>Thêm kỹ năng</button></form>{items.map(skill=><div key={skill.id}><form action={saveSkill} className="admin-form"><SkillFields skill={skill}/><button>Lưu kỹ năng</button></form><form action={deleteSkill}><input type="hidden" name="id" value={skill.id}/><button>Xóa kỹ năng</button></form></div>)}</section>; }
