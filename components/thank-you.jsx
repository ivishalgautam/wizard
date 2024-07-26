import Image from "next/image";
import React from "react";
import { H1, P } from "./ui/typography";

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <H1 className={"text-center text-primary"}>Thank You !</H1>
        <P className={"text-center mb-16"}>
          Thank you for visiting our website. We will connect with you soon.
        </P>
        <Image
          src={"/thank-you.svg"}
          width={500}
          height={500}
          alt="Thank you"
        />
      </div>
    </div>
  );
}
