"use server";

import { action } from "~/lib/safe-action";
import { UploadSchema } from "~/lib/validators";
import { db, schema } from "~/server/db";
import { getUserServer } from "~/utils/auth/get-user-server";

export const addImage = action(UploadSchema, async ({ filename, url }) => {
  const user = await getUserServer();

  await db.insert(schema.image).values({
    name: filename,
    url,
    profileId: user.id,
  });

  return { message: "Image uploaded successfully" };
});
