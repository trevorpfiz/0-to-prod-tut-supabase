import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

import { env } from "~/env";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();

  console.log(filename);

  try {
    const client = new S3Client({
      forcePathStyle: true,
      region: env.AWS_REGION,
      endpoint: env.AWS_ENDPOINT,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const { url, fields } = await createPresignedPost(client, {
      Bucket: env.AWS_BUCKET_NAME,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    console.log(url);

    // https://wpcbdblradsxjxirufbv.supabase.co/storage/v1/object/sign/mock/cool.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2NrL2Nvb2wucG5nIiwiaWF0IjoxNzE0OTQ4NTUwLCJleHAiOjE3MTU1NTMzNTB9.szEmTuckS0l2NRlcW-qMrZ8EZXmqMf17svcap7qpBb0&t=2024-05-05T22%3A35%3A50.151Z

    return Response.json({ url, fields });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
