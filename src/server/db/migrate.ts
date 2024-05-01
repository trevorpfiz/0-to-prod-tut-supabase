import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connectionString = process.env.DATABASE_URL;
  const sql = postgres(connectionString, { prepare: false });
  const db = drizzle(sql);

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "src/server/db/migrations" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
