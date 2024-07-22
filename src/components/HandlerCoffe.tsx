"use client";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface HandlerCoffeProps {
  className?: string;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandlerCoffe(props: HandlerCoffeProps) {
  const { setActive, className } = props;
  const [qty, setQty] = useState<number>(1);

  return (
    <>
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
      <Select>
        <SelectTrigger className="h-fit border-none bg-lightGrey p-1 rounded-[4px] text-dark">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent className="bg-mainGreen/90 border-none rounded-[4px] text-white">
          <SelectGroup>
            <SelectLabel>Size</SelectLabel>
            <SelectItem value="small" className="cursor-pointer">Small</SelectItem>
            <SelectItem value="medium" className="cursor-pointer">Medium</SelectItem>
            <SelectItem value="large" className="cursor-pointer">Large</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <button
        type="button"
        className="bg-mainGreen h-fit p-[5px] rounded-[5px]"
        onClick={() => setActive(false)}
      >
        <IoMdCheckmark className="text-white" />
      </button>
    </>
  );
}
