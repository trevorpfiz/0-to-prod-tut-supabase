import { relations } from "drizzle-orm";
import { uuid, varchar } from "drizzle-orm/pg-core";

import { image } from "./image";
import { createTable } from "~/server/db/schema/_table";

export const profile = createTable("profile", {
  // Matches id from auth.users table in Supabase
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
});

export const profileRelations = relations(profile, ({ many }) => ({
  images: many(image),
}));

// 1. Setup foreign key from id to auth.users table in Supabase
// 2. Paste code below into Supabase SQL editor
/**
-- inserts a row into public.profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.tut_profile (id, email, name, image)
  values (
    new.id,
    new.raw_user_meta_data ->> 'email',
    COALESCE(
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'user_name',
      '[redacted]'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
 */

// 3. Revoke public access (don't need RLS?) - https://www.reddit.com/r/Supabase/comments/1avtplw/comment/krg9k7y/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
/**
REVOKE USAGE ON SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

-- remove permissions for all non-postgres users to execute functions in public
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM public;
-- grant back permissions to the service_role
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;
*/
