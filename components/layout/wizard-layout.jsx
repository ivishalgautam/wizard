import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

export default function WizardLayout({ children }) {
  return (
    <div>
      <div className="relative before:absolute before:bg-black/50 before:top-0 before:left-0 before:w-full before:h-full">
        <Link
          href={"/"}
          className={cn(
            "absolute top-4 left-4 z-50 text-white",
            buttonVariants({ variant: "" })
          )}
        >
          <MoveLeft className="mr-1" /> Home
        </Link>
        <div className="absolute z-10 w-full h-full flex items-center justify-center">
          <Image
            src={"/images/logo.png"}
            className="drop-shadow-xl"
            width={300}
            height={300}
            alt="logo"
          />
        </div>
        <div className="bg-black/20">
          <Image
            src={"/images/hero.jpeg"}
            width={500}
            height={500}
            alt="tub"
            className="w-full h-60 object-cover object-center"
          />
        </div>
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-primary text-white py-1">
        <div className="inline-block animate-marquee divide-x-2">
          {Array.from({ length: 3 }).map((_, key) => (
            <span key={key} className="px-4">
              Buy a Spa and have it delivered before Christmas to receive 6 free
              spa valets.
            </span>
          ))}
        </div>
      </div>

      <div className="mt-20">{children}</div>
    </div>
  );
}
