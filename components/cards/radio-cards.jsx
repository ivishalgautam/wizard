import React from "react";
import { H5 } from "../ui/typography";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, stagger } from "framer-motion";

export default function RadioCards({ item, handleSelect, selected }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div layout className="grid grid-cols-12 w-full gap-10">
        <AnimatePresence>
          {item.content?.map((ele, ind) => (
            <Card
              key={ind}
              ind={ind}
              ele={ele}
              name={item.name}
              handleSelect={handleSelect}
              selected={selected}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function Card({ ind, name, ele, handleSelect, selected }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.1,
        delay: ind / 5,
      }}
      className={cn(
        "flex items-center col-span-6 md:col-span-3 xl:col-span-3 rounded-xl space-x-2 relative border-4 overflow-hidden transition-all",
        {
          "border-primary/50 bg-primary/20 scale-105":
            ele.value === selected.size ||
            ele.value === selected.person ||
            ele.value === selected.lounger,
          "pointer-events-none":
            (name !== "size" &&
              name === "person" &&
              !ele.size.includes(selected.size)) ||
            (name === "lounger" && !ele.person.includes(selected.person)),
        }
      )}
      onClick={() => handleSelect(name, ele.value)}
    >
      <div
        key={ele.value}
        className={cn(
          "capitalize transition-colors w-full h-full cursor-pointer relative flex p-10 bg-white items-center justify-center",
          {
            "cursor-not-allowed bg-gray-200 text-gray-300":
              (name === "person" && !ele.size.includes(selected.size)) ||
              (name === "lounger" && !ele.person.includes(selected.person)),
          }
        )}
      >
        {[selected.size, selected.person, selected.lounger].includes(
          ele.value
        ) && (
          <div
            value={ele.value}
            id={ele.value}
            className="absolute size-6 before:size-4 before:top-0.5 before:left-0.5 before:absolute before:rounded-full before:bg-primary top-4 right-4 bg-white border-2 border-primary rounded-full"
            // checked={value === ele.value}
          ></div>
        )}
        <div className="space-y-4">
          <div
            className={cn(
              "flex items-center justify-center flex-wrap mx-auto w-52 text-gray-400",
              {
                "text-primary":
                  name !== "size" &&
                  [selected.person, selected.longer].includes(ele.value),
              }
            )}
          >
            {ele.icon}
          </div>
          <H5 className={"text-center mt-6 font-extrabold"}>{ele.label}</H5>
        </div>
      </div>
    </motion.div>
  );
}
