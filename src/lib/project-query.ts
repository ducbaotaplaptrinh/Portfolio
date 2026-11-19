export type ProjectFilters = { query:string; status:"all"|"draft"|"published"|"archived"; page:number };
type Params = Record<string,string|string[]|undefined>;
export function parseProjectFilters(params:Params):ProjectFilters {
  const rawQuery=typeof params.q === "string" ? params.q.trim().slice(0,100) : "";
  const status=typeof params.status === "string" && ["draft","published","archived"].includes(params.status) ? params.status as ProjectFilters["status"] : "all";
  const rawPage=typeof params.page === "string" && /^[1-9]\d{0,5}$/.test(params.page) ? Number(params.page) : 1;
  return {query:rawQuery,status,page:rawPage};
}
export function projectPageUrl(filters:ProjectFilters,page:number):string {
  const params=new URLSearchParams(); if(filters.query) params.set("q",filters.query); if(filters.status !== "all") params.set("status",filters.status); params.set("page",String(page)); return `/admin?${params.toString()}#projects`;
}
