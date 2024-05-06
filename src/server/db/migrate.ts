import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connectionString = process.env.DATABASE_URL;
  const sql = postgres(connectionString, { prepare: false });
  const db = drizzle(sql);

  const _start = Date.now();

  await migrate(db, { migrationsFolder: "src/server/db/migrations" });

  const _end = Date.now();

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
