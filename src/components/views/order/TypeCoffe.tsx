"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function TypeCoffe() {
  const [typeCoffeActive, setTypeCoffeActive] = useState<string>("Expresso");

  const typesCoffe = [
    "Expresso",
    "Americano",
    "Long Black",
    "Cappucino",
    "Caffe Latte",
    "Mocca Latte",
    "Afogato",
    "Cold Brew",
    "Macchiato",
  ];

  return (
    <div className="flex gap-x-2 overflow-auto px-2 pt-22">
      {typesCoffe.map((item) => (
        <div
          key={item}
          className={cn(
            "flex items-center justify-center min-w-[8rem] max-w-[9rem] rounded-[7px]",
            item === typeCoffeActive ? "bg-dark" : "bg-slate-200"
          )}
        >
          <Button
            className={cn(
              "text-sm bg-transparent border-none shadow-none",
              item === typeCoffeActive ? "text-white" : "text-dark"
            )}
            onClick={() => setTypeCoffeActive(item)}
          >
            {item}
          </Button>
        </div>
      ))}
    </div>
  );
}
