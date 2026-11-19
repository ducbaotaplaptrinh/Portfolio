import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicContent, getPublicSettings } from "@/db/public";
import { hasDatabaseUrl } from "@/db/config";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  if (!hasDatabaseUrl(process.env.DATABASE_URL)) return {};
  try { const settings = await getPublicSettings(); return { title: settings?.seoTitle || "Portfolio", description: settings?.seoDescription || "Portfolio cá nhân" }; } catch { return {}; }
}
function safeUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return value;
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : null; } catch { return null; }
}
function period(start: string | null, end: string | null, current = false) {
  const format = (date: string) => date.slice(0, 7).split("-").reverse().join("/");
  return [start ? format(start) : null, current ? "Hiện tại" : end ? format(end) : null].filter(Boolean).join(" – ");
}
export default async function Home() {
  let data: Awaited<ReturnType<typeof getPublicContent>> | null = null;
  if (hasDatabaseUrl(process.env.DATABASE_URL)) { try { data = await getPublicContent(); } catch { console.error("Unable to load public portfolio data"); } }
  const profile = data?.profile;
  const settings = data?.settings;
  const showProjects = settings?.sections?.projects !== false;
  const showAbout = settings?.sections?.about !== false;
  const avatar = safeUrl(profile?.avatarUrl);
  const github = safeUrl(settings?.socialLinks?.github) || safeUrl(profile?.githubUrl);
  const linkedin = safeUrl(settings?.socialLinks?.linkedin) || safeUrl(profile?.linkedinUrl);
  const resume = safeUrl(profile?.resumeUrl);
  const initials = profile?.fullName?.trim().split(/\s+/).slice(-2).map(word => word.charAt(0).toLocaleUpperCase("vi")).join("") || "P";
  return <>
    <header className="nav"><a className="brand" href="#top">{profile?.fullName ?? "Portfolio"}<span>.</span></a><nav aria-label="Điều hướng chính">{showProjects && <a href="#work">Dự án</a>}{showAbout && <a href="#about">Giới thiệu</a>}{profile?.email && <a href={`mailto:${profile.email}`}>Liên hệ</a>}</nav></header>
    <main id="top">
      <section className="hero static-hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="hero-intro">{profile?.fullName ? "Xin chào, tôi là" : "Portfolio cá nhân"}</p><h1 id="hero-title">{profile?.fullName ?? "Portfolio"}</h1>{profile?.headline && <p className="hero-headline">{profile.headline}</p>}{profile?.bio && <p>{profile.bio}</p>}<div className="hero-actions">{showProjects && <a className="button" href="#work">Xem dự án</a>}{resume && <a className="text-link" href={resume}>Xem CV</a>}</div></div><div className="hero-profile" aria-hidden="true">{avatar ? <Image src={avatar} width={520} height={580} alt="" unoptimized className="hero-avatar"/> : <span className="profile-initials">{initials}</span>}<div className="profile-caption"><span>{profile?.fullName ?? "Portfolio"}</span>{profile?.location && <span>{profile.location}</span>}</div></div></section>
      {!data && <p className="content-notice" role="status">Dữ liệu portfolio hiện không khả dụng. Vui lòng thử lại sau.</p>}
      {showProjects && <section id="work" className="content"><div className="section-title"><div><p className="section-index">01 / Dự án</p><h2>Sản phẩm đã thực hiện</h2></div></div>{!data ? <p className="empty">Không thể tải dự án lúc này.</p> : data.work.length ? <div className="project-grid">{data.work.map(project => { const thumbnail = safeUrl(project.thumbnailUrl); return <article className="project" key={project.id}>{thumbnail && <div className="project-image"><Image src={thumbnail} alt="" width={800} height={500} unoptimized/></div>}<div className="project-body"><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p><Link className="text-link" href={`/projects/${project.slug}`}>Xem chi tiết</Link></div></article>; })}</div> : <p className="empty">Các dự án sẽ được cập nhật tại đây.</p>}</section>}
      {showAbout && <section id="about" className="content"><div className="section-title"><div><p className="section-index">02 / Giới thiệu</p><h2>Về tôi</h2></div></div><div className="about-grid"><div><p className="about-copy">{profile?.bio ?? (data ? "Thông tin giới thiệu sẽ được cập nhật tại đây." : "Dữ liệu giới thiệu hiện không khả dụng.")}</p>{profile?.location && <p className="profile-location">{profile.location}</p>}</div><div>{!!data?.abilities.length && <><h3>Kỹ năng</h3><div className="skills">{data.abilities.map(skill => <span key={skill.id}>{skill.name}</span>)}</div></>}</div></div></section>}
      {!!data?.history.length && <section className="content"><div className="section-title"><div><p className="section-index">Kinh nghiệm</p><h2>Quá trình làm việc</h2></div></div><div className="timeline">{data.history.map(item => <article key={item.id}><div><h3>{item.position}</h3><p>{item.company}</p></div><div><p>{period(item.startDate,item.endDate,item.isCurrent)}</p>{item.description && <p>{item.description}</p>}</div></article>)}</div></section>}
      {!!data?.study.length && <section className="content"><div className="section-title"><div><p className="section-index">Học vấn</p><h2>Quá trình học tập</h2></div></div><div className="timeline">{data.study.map(item => <article key={item.id}><div><h3>{item.institution}</h3><p>{[item.degree,item.fieldOfStudy].filter(Boolean).join(", ")}</p></div><div><p>{period(item.startDate,item.endDate)}</p>{item.description && <p>{item.description}</p>}</div></article>)}</div></section>}
    </main><footer><span>{profile?.fullName ?? "Portfolio"}</span><div className="footer-links">{profile?.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}{github && <a href={github}>GitHub</a>}{linkedin && <a href={linkedin}>LinkedIn</a>}<Link href="/admin">Quản trị</Link></div></footer>
  </>;
}
