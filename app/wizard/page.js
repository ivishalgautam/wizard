"use client";
import WizardForm from "@/components/forms/wizard";
import Hero from "@/components/hero";
import ThankYou from "@/components/thank-you";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFormSubmit) {
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  }, [isFormSubmit]);

  return (
    <div>
      {isFormSubmit ? (
        <ThankYou />
      ) : (
        <WizardForm setIsFormSubmit={setIsFormSubmit} />
      )}
    </div>
  );
}
