import { experimental_taintUniqueValue } from "react";
import "server-only";

import { db } from "~/server/db";

export const getUserImages = async (userId: string) => {
  const images = await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (model, { eq }) => eq(model.profileId, userId),
  });

  // Loop through each image and taint the URL
  //   images.forEach((image) => {
  //     experimental_taintUniqueValue(
  //       "Do not pass the image URL to unauthorized clients",
  //       image,
  //       image.url,
  //     );
  //   });

  return images;
};
