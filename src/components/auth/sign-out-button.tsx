import { Button } from "~/components/ui/button";

import { signOut } from "~/lib/actions/auth";

interface SignOutButtonProps {
  children?: React.ReactNode;
}

export const SignOutButton = ({ children }: SignOutButtonProps) => {
  return (
    <form>
      <Button size="lg" formAction={signOut}>
        Sign out
      </Button>
    </form>
  );
};
