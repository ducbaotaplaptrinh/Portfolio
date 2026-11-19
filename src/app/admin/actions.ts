"use server";
import { requireAdmin } from "@/auth";
import { database } from "@/db";
import { projects } from "@/db/schema";
import { parseProjectForm } from "@/lib/project-validation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export async function createProject(form: FormData) { await requireAdmin(); const parsed = parseProjectForm(form); if (!parsed.success) throw new Error("Dữ liệu dự án không hợp lệ"); await database().insert(projects).values(parsed.data); revalidatePath("/"); revalidatePath("/admin"); }
export async function updateProject(form: FormData) { await requireAdmin(); const id = z.string().uuid().parse(form.get("id")); const parsed = parseProjectForm(form); if (!parsed.success) throw new Error("Dữ liệu dự án không hợp lệ"); await database().update(projects).set(parsed.data).where(eq(projects.id,id)); revalidatePath("/"); revalidatePath("/admin"); revalidatePath(`/projects/${parsed.data.slug}`); }
export async function deleteProject(form: FormData) { await requireAdmin(); if (form.get("confirm") !== "yes") throw new Error("Cần xác nhận trước khi xóa dự án"); const id=z.string().uuid().parse(form.get("id")); await database().delete(projects).where(eq(projects.id,id)); revalidatePath("/"); revalidatePath("/admin"); }
