import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="relative before:absolute before:bg-black/50 before:top-0 before:left-0 before:w-full before:h-full p-">
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
  );
}
