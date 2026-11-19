import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Match Next.js environment loading without committing connection strings.
loadEnvConfig(process.cwd());

export default defineConfig({ schema: "./src/db/schema.ts", out: "./drizzle", dialect: "postgresql", dbCredentials: { url: process.env.DATABASE_URL ?? "" } });
