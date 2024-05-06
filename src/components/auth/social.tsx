import { Github } from "lucide-react";

import { Button } from "~/components/ui/button";

import { signInWithGithub } from "~/lib/actions/auth";

export const Social = () => {
  return (
    <form className="flex w-full flex-col items-center gap-2">
      <Button
        size="lg"
        className="flex w-full flex-row items-center justify-center gap-2"
        variant="outline"
        formAction={signInWithGithub}
      >
        <Github className="h-5 w-5" />
        <span className="font-medium text-muted-foreground">
          Continue with GitHub
        </span>
      </Button>
    </form>
  );
};
