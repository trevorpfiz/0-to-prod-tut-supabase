import Link from "next/link";
import { SignOutButton } from "~/components/auth/sign-out-button";
import { createClient } from "~/utils/supabase/server";

async function TopNav() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const signedIn = data?.user && !error;

  return (
    <nav className="flex w-full items-center justify-between border-b p-4">
      <h1 className="text-xl font-semibold">Gallery</h1>

      {signedIn ? (
        <div className="flex items-center">
          <SignOutButton />
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/signin"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export { TopNav };
