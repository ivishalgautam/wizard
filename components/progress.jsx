import React from "react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import { AiOutlineProduct } from "react-icons/ai";
import { PencilRuler, PersonStanding } from "lucide-react";
import { FaHotTub } from "react-icons/fa";

export default function ProgressBar({ data, currPos }) {
  function calculateCurrProgress() {
    return Math.floor(currPos * (100 / (data.length - 1)));
  }
  return (
    <div className="relative w-[80%] mx-auto">
      <Progress value={calculateCurrProgress()} className={cn("")} />
      <div className="absolute w-full -top-12">
        {data
          .map((item) => ({
            name: item.name,
            icon: item?.icon,
          }))
          .map((item, ind) => (
            <div
              key={item.name}
              className={cn(
                "bg-white flex-col font-bold border size-28 border-primary transition-colors shadow-md rounded-full flex items-center justify-center capitalize -translate-x-1/2",
                {
                  "bg-primary text-white": ind <= currPos,
                }
              )}
              style={{
                position: "absolute",
                top: "0",
                left: `${Math.floor(ind * (100 / (data.length - 1)))}%`,
              }}
            >
              <span
                className={cn("text-gray-500", {
                  "text-white": ind <= currPos,
                })}
              >
                {item.name === "size" && <PencilRuler size={30} />}
                {item.name === "person" && <PersonStanding size={30} />}
                {item.name === "lounger" && <FaHotTub size={30} />}
                {item.name === "products" && <AiOutlineProduct size={30} />}
              </span>
              <span>{item.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
