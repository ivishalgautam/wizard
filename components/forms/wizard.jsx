"use client";
import RadioCards from "@/components/cards/radio-cards";
import ProgressBar from "@/components/progress";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ProductCards from "../cards/product-cards";
import { data } from "@/data";
import Image from "next/image";
import { toast } from "sonner";
import { MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WizardForm({ setIsFormSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({
    size: "",
    person: "",
    lounger: "",
  });

  const [errors, setErrors] = useState({});

  const [currPos, setCurrPos] = useState(0);

  function handlePrev() {
    const newPos = currPos + 1;
    if (newPos <= 1) return;
    setCurrPos((prev) => prev - 1);
  }

  async function handleNext() {
    const currName = data[currPos].name;

    if (!selected[currName]) {
      const newErrors = { [currName]: { message: "Please select one option" } };
      setErrors(newErrors);
      return;
    } else {
      setErrors((prev) => {
        delete prev[currName];
        return prev;
      });
    }

    const newPos = currPos + 1;
    if (newPos >= data.length) return;
    setSelected((prev) => ({ ...prev, [data[newPos].name]: "" }));

    setCurrPos(newPos);
  }

  function filteredProducts() {
    const filteredData = data[data.length - 1].data.filter(
      (product) =>
        product.size === selected.size &&
        product.persons === selected.person &&
        product.lounger === selected.lounger
    );
    return filteredData;
  }

  async function handleQuery(inputs) {
    if (!inputs.name) {
      return toast.error("Please enter you name!");
    }
    if (!inputs.phone) {
      return toast.error("Please enter you phone!");
    }
    if (!inputs.message) {
      return toast.error("Please enter you message!");
    }
    if (!inputs.email) {
      return toast.error("Please enter you email!");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(inputs);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      setIsLoading(true);
      const resp = await fetch(
        "https://anndaan.app/api/enquiry.php",
        requestOptions
      );
      const data = await resp.json();
      toast.success(data.message ?? "Enquiry submit");
      if (data.status) {
        setIsFormSubmit(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message ?? "Unable to send enquiry!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelect = (name, value) => {
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
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
      <div className="mt-20">
        <ProgressBar data={data} currPos={currPos} />

        <div className="container p-8 space-y-20 pb-32">
          {currPos === data.length - 1 ? (
            <div className="mt-20">
              <ProductCards
                handleSubmit={handleQuery}
                products={filteredProducts()}
                isLoading={isLoading}
              />
            </div>
          ) : (
            data.map((item, key) => (
              <div
                key={key}
                className={cn("hidden space-y-8", {
                  block: key === currPos,
                })}
              >
                <H1 className={"text-center my-24"}>{item.heading}</H1>
                {errors[item.name] && (
                  <span className="text-red-500 font-extrabold">
                    {errors[item.name].message}
                  </span>
                )}
                <RadioCards
                  item={item}
                  handleSelect={handleSelect}
                  selected={selected}
                />
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between fixed bottom-0 w-full left-0 p-5 z-50 bg-white shadow-lg">
          <Button type="button" onClick={handlePrev} disabled={currPos === 0}>
            <MoveLeft /> &nbsp; Previous
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={currPos >= data.length - 1}
          >
            Next &nbsp; <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
