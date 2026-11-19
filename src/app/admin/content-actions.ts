"use server";
import { requireAdmin } from "@/auth";
import { database } from "@/db";
import { profiles, skills } from "@/db/schema";
import { profileSchema, skillSchema } from "@/lib/cms-validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const idSchema = z.string().uuid();
const refresh = () => { revalidatePath("/"); revalidatePath("/admin"); };
export async function saveProfile(form: FormData) {
  await requireAdmin();
  const data = profileSchema.parse(Object.fromEntries(form));
  const id = form.get("id");
  if (id) await database().update(profiles).set(data).where(eq(profiles.id, idSchema.parse(id)));
  else await database().insert(profiles).values(data);
  refresh();
}
export async function saveSkill(form: FormData) {
  await requireAdmin();
  const data = skillSchema.parse(Object.fromEntries(form));
  const id = form.get("id");
  if (id) await database().update(skills).set(data).where(eq(skills.id, idSchema.parse(id)));
  else await database().insert(skills).values(data);
  refresh();
}
export async function deleteSkill(form: FormData) {
  await requireAdmin();
  await database().delete(skills).where(eq(skills.id, idSchema.parse(form.get("id"))));
  refresh();
}
