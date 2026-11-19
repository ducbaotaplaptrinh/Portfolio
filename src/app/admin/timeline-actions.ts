"use server";

import { requireAdmin } from "@/auth";
import { database } from "@/db";
import { education, experiences } from "@/db/schema";
import { educationSchema, experienceSchema } from "@/lib/timeline-validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const recordId = z.string().uuid();

function refreshTimeline() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveExperience(form: FormData) {
  await requireAdmin();
  const data = experienceSchema.parse(Object.fromEntries(form));
  const id = form.get("id");
  if (id) {
    await database().update(experiences).set(data).where(eq(experiences.id, recordId.parse(id)));
  } else {
    await database().insert(experiences).values(data);
  }
  refreshTimeline();
}

export async function deleteExperience(form: FormData) {
  await requireAdmin();
  await database().delete(experiences).where(eq(experiences.id, recordId.parse(form.get("id"))));
  refreshTimeline();
}

export async function saveEducation(form: FormData) {
  await requireAdmin();
  const data = educationSchema.parse(Object.fromEntries(form));
  const id = form.get("id");
  if (id) {
    await database().update(education).set(data).where(eq(education.id, recordId.parse(id)));
  } else {
    await database().insert(education).values(data);
  }
  refreshTimeline();
}

export async function deleteEducation(form: FormData) {
  await requireAdmin();
  await database().delete(education).where(eq(education.id, recordId.parse(form.get("id"))));
  refreshTimeline();
}
