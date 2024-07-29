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
import Counter from "./Counter";

interface HandlerCoffeProps {
  className?: string;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandlerCoffe(props: HandlerCoffeProps) {
  const { setActive, className } = props;

  return (
    <>
      <Counter className={className} />
      <Select>
        <SelectTrigger className="h-fit border-none bg-lightGrey p-1 rounded-[4px] text-dark">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent className="bg-mainGreen/90 border-none rounded-[4px] text-white">
          <SelectGroup>
            <SelectLabel>Size</SelectLabel>
            <SelectItem value="small" className="cursor-pointer">
              Small
            </SelectItem>
            <SelectItem value="medium" className="cursor-pointer">
              Medium
            </SelectItem>
            <SelectItem value="large" className="cursor-pointer">
              Large
            </SelectItem>
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
