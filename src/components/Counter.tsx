"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CounterProps {
  className?: string;
}
export default function Counter(props: CounterProps) {
  const { className } = props;
  const [qty, setQty] = useState<number>(1);

  return (
    <div
      className={cn(
        "flex h-fit gap-x-2 justify-around items-center flex-1 w-[100px] text-dark py-[2px] bg-lightGrey rounded-[4px]",
        className
      )}
    >
      <button
        className="px-1"
        onClick={() => (qty < 2 ? null : setQty(qty - 1))}
      >
        -
      </button>
      <span className="text-sm">{qty}</span>
      <button className="px-1" onClick={() => setQty(qty + 1)}>
        +
      </button>
    </div>
  );
}
