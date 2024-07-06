"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
import { Button } from "../ui/button";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px]  shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="grid grid-cols-2">
        <BackButton href={backButtonHref} label={backButtonLabel} />
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href="/">Go Back To Home?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
