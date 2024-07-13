"use client";
import { CiFilter } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Option from "@/components/Option";
export default function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const optionTransaction = ["All", "Completed", "In Progress", "Cancelled"];

  return (
    <div className="w-full flex items-center gap-x-2 mt-4">
      <div className="w-[85%] bg-white flex items-center rounded-[9px] px-2 shadow-md py-[0.5px]">
        <CiSearch className="text-md text-darkGrey" />
        <Input
          type="text"
          placeholder="Search Transaction"
          className="bg-transparent border-none placeholder:text-darkGrey text-darkGrey"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-[15%] h-full bg-mainGreen shadow-sm rounded-[8px] text-white flex py-[10px] items-center justify-center"
          >
            <CiFilter className="font-bold text-xl" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <h3 className="text-dark font-semibold text-xl">
            Transaction Status
          </h3>
          <Option
            data={optionTransaction}
            initiateValue={optionTransaction[0]}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
