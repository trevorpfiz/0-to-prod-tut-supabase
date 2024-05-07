import Image from "next/image";
import { getUserImages } from "~/lib/api/queries";
import { getUserServer } from "~/utils/auth/get-user-server";

export const dynamic = "force-dynamic";

async function Images({ userId }: { userId: string }) {
  const images = await getUserImages(userId);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <Image src={image.url} alt="logo" width={192} height={192} />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const user = await getUserServer();
  const signedIn = user.id;

  return (
    <main className="flex flex-col gap-4 px-4 py-10 lg:px-8 sm:px-6">
      <h1 className="font-bold text-3xl">Gallery</h1>

      {signedIn ? <Images userId={user.id} /> : <p>Sign in to view images</p>}
    </main>
  );
}
