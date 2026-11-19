"use server";
import { requireAdmin } from "@/auth";
import { database } from "@/db";
import { projects } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const project = z.object({title:z.string().trim().min(1).max(200),slug:z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(200),summary:z.string().trim().min(1).max(1000),status:z.enum(["draft","published","archived"])});
export async function createProject(form:FormData) { await requireAdmin(); const parsed=project.safeParse(Object.fromEntries(form)); if (!parsed.success) throw new Error("Dữ liệu dự án không hợp lệ"); await database().insert(projects).values(parsed.data); revalidatePath("/"); revalidatePath("/admin"); }
export async function deleteProject(form:FormData) { await requireAdmin(); const id=z.string().uuid().parse(form.get("id")); await database().delete(projects).where(eq(projects.id,id)); revalidatePath("/"); revalidatePath("/admin"); }
