// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "~/server/db/schema/_table";
import { profile } from "~/server/db/schema/profile";

export const image = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),

    profileId: varchar("profile_id", { length: 256 })
      .notNull()
      .references(() => profile.id),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const imageRelations = relations(image, ({ one }) => ({
  profile: one(profile, {
    fields: [image.profileId],
    references: [profile.id],
  }),
}));
