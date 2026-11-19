import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { database } from "./index";
import { profiles, projects, skills, experiences, education, siteSettings } from "./schema";

/** Missing configuration and failed queries are errors, not empty portfolios. */
export async function getPublicContent() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  const db = database();
  const [profile, work, abilities, history, study, settings] = await Promise.all([
    db.select().from(profiles).limit(1),
    db.select().from(projects).where(eq(projects.status, "published")).orderBy(asc(projects.displayOrder)),
    db.select().from(skills).orderBy(asc(skills.displayOrder)),
    db.select().from(experiences).orderBy(asc(experiences.displayOrder)),
    db.select().from(education),
    db.select().from(siteSettings).limit(1),
  ]);
  return { profile: profile[0], work, abilities, history, study, settings:settings[0] };
}

export async function getPublishedProject(slug: string) {
  const rows = await database().select().from(projects).where(and(eq(projects.slug, slug), eq(projects.status, "published"))).limit(1);
  return rows[0] ?? null;
}

export async function getPublicSettings() { const [settings]=await database().select().from(siteSettings).limit(1); return settings; }
