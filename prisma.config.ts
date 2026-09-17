import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const config = {
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
};

export default defineConfig(config);
