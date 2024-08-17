"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { useTypeCoffe } from "@/store/useTypeCoffe";
import { Coffe } from "@prisma/client";

interface OptionProps {
  data: Coffe["type"][];
  initiateValue: Coffe["type"];
}
export default function Option(props: OptionProps) {
  const { data, initiateValue } = props;
  const [valueActive, setValueActive] = useState<string>(initiateValue);
  const { setType } = useTypeCoffe();

  return (
    <div className="flex gap-x-2 overflow-auto px-2 pt-2">
      {data.map((item) => (
        <div
          key={item}
          className={cn(
            "flex items-center justify-center min-w-[8rem] max-w-[9rem] rounded-[7px]",
            item === valueActive ? "bg-mainGreen" : "bg-slate-200"
          )}
        >
          <Button
            className={cn(
              "text-sm bg-transparent border-none w-full shadow-none",
              item === valueActive ? "text-white" : "text-maingrebg-mainGreen"
            )}
            onClick={() => {
              setValueActive(item);
              setType(item);
            }}
          >
            {item}
          </Button>
        </div>
      ))}
    </div>
  );
}
