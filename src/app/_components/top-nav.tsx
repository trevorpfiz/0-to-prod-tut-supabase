import Link from "next/link";
import { FileUpload } from "~/app/_components/file-upload";
import { SignOutButton } from "~/components/auth/sign-out-button";
import { createClient } from "~/utils/supabase/server";

const TopNav = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const signedIn = data?.user && !error;

  return (
    <nav className="flex w-full items-center justify-between border-b p-4">
      <h1 className="font-semibold text-xl">Gallery</h1>
      <div className="flex items-center gap-4">
        {signedIn && <FileUpload />}
        <SignOutButton />
      </div>
      {!signedIn && (
        <Link
          className="font-medium text-sm underline-offset-4 hover:underline"
          href="/signin"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export { TopNav };
