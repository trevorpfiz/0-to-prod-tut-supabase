import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema",
  schemaFilter: ["public"],
  out: "./src/server/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["tut_*"],
} satisfies Config;
