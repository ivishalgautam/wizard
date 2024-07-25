import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { H5 } from "../ui/typography";
import { cn } from "@/lib/utils";

export default function RadioCards({ onChange, value, item, watch }) {
  return (
    <RadioGroup
      onValueChange={onChange}
      defaultValue={value}
      className="flex items-center justify-center"
    >
      <div className="grid grid-cols-12 w-full gap-10">
        {item.content?.map((ele, ind) => (
          <div
            key={ind}
            className={cn(
              "flex items-center col-span-6 md:col-span-3 xl:col-span-3 rounded-xl space-x-2 relative border-4 overflow-hidden transition-all",
              {
                "border-primary/50 bg-primary/20 scale-105":
                  watch(item.name) === ele.value,
                "cursor-not-allowed":
                  (item.name === "person" &&
                    !ele.size.includes(watch("size"))) ||
                  (item.name === "lounger" &&
                    !ele.person.includes(watch("person"))),
              }
            )}
          >
            <Label
              htmlFor={ele.value}
              key={ele.value}
              className={cn(
                "capitalize transition-colors w-full h-full cursor-pointer flex p-10 bg-white items-center justify-center",
                {
                  "pointer-events-none bg-gray-200 text-gray-300":
                    (item.name === "person" &&
                      !ele.size.includes(watch("size"))) ||
                    (item.name === "lounger" &&
                      !ele.person.includes(watch("person"))),
                }
              )}
            >
              <RadioGroupItem
                value={ele.value}
                id={ele.value}
                className="absolute top-4 right-4 text-primary"
                // checked={watch(item.name) === ele.value}
              />
              <div className="space-y-4">
                <div
                  className={cn(
                    "flex items-center justify-center flex-wrap mx-auto w-52 text-gray-400",
                    {
                      "text-primary": watch(item.name) === ele.value,
                    }
                  )}
                >
                  {ele.icon}
                </div>
                <H5 className={"text-center mt-6 font-extrabold"}>
                  {ele.label}
                </H5>
              </div>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
