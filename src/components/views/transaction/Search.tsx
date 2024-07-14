"use client";
import { CiFilter } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Option from "@/components/Option";
import FilterItem from "./FilterItem";
import { RadioGroup } from "@/components/ui/radio-group";
import RadioItem from "./RadioItem";
import ButtonBuy from "@/components/ButtonBuy";

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
            className="w-[15%] h-full bg-mainGreen shadow-md shadow-dark/25 rounded-[8px] text-white flex py-[10px] items-center justify-center"
          >
            <CiFilter className="font-bold text-xl" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogTitle className="text-darkGreen text-2xl font-semibold text-center">Filter History</DialogTitle>
          <FilterItem title="Transaction Status">
            <Option
              data={optionTransaction}
              initiateValue={optionTransaction[0]}
            />
          </FilterItem>
          <FilterItem title="Date">
            <RadioGroup defaultValue="Last 7 Days" className="mt-2">
              <RadioItem value="Last 7 Days" id="r1" />
              <RadioItem value="Last 30 Days" id="r2" />
              <RadioItem value="Last 90 Days" id="r3" />
            </RadioGroup>
          </FilterItem>
          <FilterItem title="Sort">
            <RadioGroup defaultValue="Newest" className="mt-2">
              <RadioItem value="Newest" id="r4" />
              <RadioItem value="Oldest" id="r5" />
            </RadioGroup>
          </FilterItem>
          <div className="w-full border-t border-darkGrey/40 flex justify-center items-center">
            <div className="flex justify-between items-center w-full mt-2">
              <ButtonBuy className="w-[48%] rounded-[8px] bg-white border-mainGreen text-mainGreen border font-semibold hover:bg-mainGreen hover:text-white">
                Reset
              </ButtonBuy>
              <ButtonBuy className="w-[48%] font-semibold rounded-[8px]">
                Apply
              </ButtonBuy>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
