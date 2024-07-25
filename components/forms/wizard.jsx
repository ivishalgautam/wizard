"use client";
import RadioCards from "@/components/cards/radio-cards";
import ProgressBar from "@/components/progress";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ProductCards from "../cards/product-cards";
import { data } from "@/data";
import Image from "next/image";

export default function WizardForm() {
  const [currPos, setCurrPos] = useState(0);
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
  } = useForm({});

  async function handleNext() {
    setValue(data[currPos + 1].name, undefined);
    const name = data[currPos].name;
    const triggers = await trigger([name]);
    if (!triggers) return;

    const newPos = currPos + 1;
    if (newPos >= data.length) return;
    setCurrPos(newPos);
  }

  function handlePrev() {
    setValue(data[currPos - 1].name, undefined);
    const newPos = currPos + 1;
    if (newPos <= 1) return;
    setCurrPos((prev) => prev - 1);
  }

  const onSubmit = (data) => {
    // console.log({ data });
  };

  function filteredProducts() {
    const filteredData = data[data.length - 1].data.filter(
      (product) =>
        product.size === watch("size") &&
        product.persons === watch("person") &&
        product.lounger === watch("lounger")
    );
    return filteredData;
  }

  console.log({ errors });

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container p-8 space-y-20 pb-20">
            <ProgressBar data={data} currPos={currPos} />

            {currPos === data.length - 1 ? (
              <ProductCards products={filteredProducts()} />
            ) : (
              data.map((item, key) => (
                <div
                  key={key}
                  className={cn("hidden space-y-8", { block: key === currPos })}
                >
                  <H1 className={"text-center my-24"}>{item.heading}</H1>
                  {errors[item.name]?.message && (
                    <span className="text-red-500 font-extrabold">
                      {errors[item.name].message}
                    </span>
                  )}
                  <Controller
                    control={control}
                    name={item.name}
                    rules={{ required: "Please select one option!" }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <RadioCards {...{ onChange, value, item, watch }} />
                      );
                    }}
                  />
                </div>
              ))
            )}

            <div className="flex items-center justify-between fixed bottom-0 w-full left-0 px-4 bg-white shadow-lg py-2">
              <Button
                type="button"
                onClick={handlePrev}
                disabled={currPos === 0}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={currPos >= data.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
