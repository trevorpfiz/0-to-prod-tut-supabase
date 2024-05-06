import { db } from "~/server/db";
import { createClient } from "~/utils/supabase/server";

export const dynamic = "force-dynamic";

async function Images() {
  const supabase = createClient();

  const { data } = supabase.storage
    .from("mock")
    .getPublicUrl("e2dfd7d1-0bcf-449d-9732-5d3844b4d5ba-spark-bang.png");

  console.log(data);

  const images = await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.id),
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

      {signedIn ? <Images /> : <p className="text-sm">Sign in to view</p>}
    </main>
  );
}
