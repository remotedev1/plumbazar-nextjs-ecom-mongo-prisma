"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
import { Button } from "../ui/button";
import Image from "next/image";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[100vw] md:w-[400px]  shadow-md my-10">
      <CardHeader>
        <div className="flex justify-center">
          <Image src={"/light-logo.png"} alt="Logo" width={100} height={100} />
        </div>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="grid md:grid-cols-2">
        <BackButton href={backButtonHref} label={backButtonLabel} />
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href="/">Go Back To Home?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
