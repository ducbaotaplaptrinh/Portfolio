import "server-only";
import { drizzle } from "drizzle-orm/neon-http";
export function database() { if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured"); return drizzle(process.env.DATABASE_URL); }
