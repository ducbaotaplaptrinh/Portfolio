import "server-only";
import { and, asc, count, eq, ilike } from "drizzle-orm";
import { database } from "./index";
import { projects } from "./schema";
import type { ProjectFilters } from "@/lib/project-query";
const pageSize=10;
export async function listAdminProjects(filters:ProjectFilters) {
  const db=database();
  const escaped=filters.query.replace(/[\\%_]/g, "\\$&");
  const where=and(filters.status === "all" ? undefined : eq(projects.status,filters.status),filters.query ? ilike(projects.title,`%${escaped}%`) : undefined);
  const [[filtered],[total]]=await Promise.all([db.select({value:count()}).from(projects).where(where),db.select({value:count()}).from(projects)]);
  const pages=Math.max(1,Math.ceil(filtered.value/pageSize));
  const page=Math.min(filters.page,pages);
  const items=await db.select().from(projects).where(where).orderBy(asc(projects.displayOrder),asc(projects.id)).limit(pageSize).offset((page-1)*pageSize);
  return {items,total:total.value,filtered:filtered.value,page,pages};
}
