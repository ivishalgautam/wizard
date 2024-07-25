"use client";

import "swiper/css";
import "swiper/css/navigation";
import WizardForm from "@/components/forms/wizard";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen space-y-16 bg-gray-100">
      <Hero />
      <WizardForm />
    </main>
  );
}
