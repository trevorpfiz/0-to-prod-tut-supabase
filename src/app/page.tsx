import { eq } from "drizzle-orm";
import { db, schema } from "~/server/db";
import { createClient } from "~/utils/supabase/server";

export const dynamic = "force-dynamic";

async function Images({ userId }: { userId: string }) {
  const images = await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: eq(schema.image.profileId, userId),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <img src={image.url} alt="logo" />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const signedIn = data?.user && !error;

  return (
    <main className="flex flex-col gap-4 px-4 py-10 lg:px-8 sm:px-6">
      <h1 className="font-bold text-3xl">Gallery</h1>

      {signedIn ? (
        <Images userId={data.user.id} />
      ) : (
        <p>Sign in to view images</p>
      )}
    </main>
  );
}
