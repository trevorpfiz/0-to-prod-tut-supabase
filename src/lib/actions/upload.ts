"use server";

import { action } from "~/lib/safe-action";
import { UploadSchema } from "~/lib/validators";
import { db, schema } from "~/server/db";
import { createClient } from "~/utils/supabase/server";

export const addImage = action(UploadSchema, async ({ filename, url }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw error;
  }

  await db.insert(schema.image).values({
    name: filename,
    url,
    profileId: data.user.id,
  });

  return { message: "Image uploaded successfully" };
});
