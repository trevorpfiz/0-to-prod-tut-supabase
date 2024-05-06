import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { env } from "~/env";
import { db, schema } from "~/server/db";
import { createClient } from "~/utils/supabase/server";

export async function POST(request: Request) {
  // Check if user is authenticated
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Get file from request formData
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const contentType = file.type;
  const filename = file.name;

  // Create a unique key for the S3 bucket
  const key = `${uuidv4()}-${filename}`;

  try {
    // Initialize the S3 client with credentials and endpoint
    const client = new S3Client({
      region: env.AWS_REGION,
      endpoint: env.AWS_ENDPOINT,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });

    // Read the file stream
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a new PutObjectCommand with file details for upload
    const uploadCommand = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    // Execute the upload command
    await client.send(uploadCommand);

    // Construct the URL to the uploaded file
    const url = `${env.SUPABASE_STORAGE_PUBLIC_URL}/${env.AWS_BUCKET_NAME}/${key}`;

    // Add image to database
    await db.insert(schema.image).values({
      name: filename,
      url,
      profileId: data.user.id,
    });

    // Return the URL to the uploaded file in a JSON response
    return new Response(JSON.stringify({ url, filename: key }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
