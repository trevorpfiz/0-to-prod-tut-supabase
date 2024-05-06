import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

import { BackButton } from "~/components/auth/back-button";
import { Header } from "~/components/auth/header";
import { Social } from "~/components/auth/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLinkLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showCredentials?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonLinkLabel,
  backButtonHref,
  showSocial,
  showCredentials,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] p-4 shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      {showCredentials && (
        <>
          <div className="flex items-center justify-center px-6 pt-0 pb-4">
            <div className="flex-grow border-muted-foreground border-t" />
            <span className="px-3 text-muted-foreground">or</span>
            <div className="flex-grow border-muted-foreground border-t" />
          </div>
          <CardContent>{children}</CardContent>
        </>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          linkLabel={backButtonLinkLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
