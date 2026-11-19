import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedProject } from "@/db/public";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{slug: string}> };
export async function generateMetadata({params}: Props): Promise<Metadata> { const {slug}=await params; const project=await getPublishedProject(slug); return project ? {title:project.title,description:project.summary} : {}; }
export default async function ProjectPage({params}: Props) { const {slug}=await params; const project=await getPublishedProject(slug); if(!project) notFound(); return <main className="admin"><Link href="/#work">← Dự án</Link><h1>{project.title}</h1><p>{project.summary}</p>{project.content && <div style={{whiteSpace:"pre-wrap"}}>{project.content}</div>}{project.demoUrl && <p><a href={project.demoUrl}>Xem dự án</a></p>}</main>; }
