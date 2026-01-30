import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // CLI now uses the Direct URL to avoid the "stuck" status
    url: process.env.DIRECT_URL, 
  },
});