import React from "react";
import { ImagesSlider } from "./image-slider";
import banner1 from "../public/images/banners/banner-1.jpg";
import banner2 from "../public/images/banners/banner-2.jpg";
import banner3 from "../public/images/banners/banner-3.jpg";
import banner4 from "../public/images/banners/banner-4.jpg";
import banner5 from "../public/images/banners/banner-5.jpg";
import Image from "next/image";
import Link from "next/link";

const banners = [banner1, banner3, banner4, banner2, banner5];

export default function Hero() {
  return (
    // <ImagesSlider images={banners}></ImagesSlider>
    <section className="relative z-50 h-screen flex items-center justify-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/60 before:z-10">
      <video
        src="/videos/hero.mp4"
        autoPlay
        // controls
        className="absolute h-full object-cover"
        muted
        loop
      ></video>
      <div className="container absolute z-20 mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <div className="mb-10">
          <Image src={"/images/logo.png"} width={300} height={300} alt="logo" />
        </div>
        <h1 className="text-4xl font-bold text-white leading-none sm:text-5xl">
          Quisquam necessita vel
          <span className="dark:text-violet-600">laborum doloribus</span>
          delectus
        </h1>
        <p className="px-8 mt-4 mb-12 text-lg text-white">
          Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab
          amet vero eaque explicabo!
        </p>
        <div className="flex flex-wrap justify-center">
          <Link
            href={"/wizard"}
            className="uppercase tracking-wider px-8 py-3 m-2 text-lg border rounded border-primary bg-primary text-white hover:bg-transparent transition-colors dark:text-gray-900 dark:border-gray-300"
          >
            Enquire now
          </Link>
        </div>
      </div>
    </section>
  );
}
