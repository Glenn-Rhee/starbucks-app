"use client";
import { CiFilter } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Option from "@/components/Option";
import FilterItem from "./FilterItem";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RadioItem from "./RadioItem";
import ButtonBuy from "@/components/ButtonBuy";
import SearchContent from "@/components/SearchContent";
import { useTransaction } from "@/store/useTransaction";
import { Transaction } from "@prisma/client";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import { toast } from "sonner";

export default function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const { access } = useUser();
  const optionTransaction: Transaction["status"][] = [
    "COMPLETED",
    "PROSES",
    "CANCELED",
  ];

  const {
    day,
    setDay,
    typeTime,
    setTypeTime,
    typeTransaction,
    setTransaction,
  } = useTransaction();

  async function handleApply() {
    const data = { day, typeTime, typeTransaction };
    try {
      const response = await fetch(
        `/api/transaction?day=${data.day}&typeTime=${data.typeTime}&typeTransaction=${data.typeTransaction}`,
        {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        }
      );

      const dataresponse = (await response.json()) as ResponsePayload;
      if (dataresponse.status === "failed")
        throw new Error(dataresponse.message);

      setTransaction(dataresponse.data);
      setOpen(false);
    } catch (error: any) {
      toast("Failed", {
        duration: 2500,
        description: error.message,
      });
    }
  }

  return (
    <div className="w-full flex items-center gap-x-2 mt-4">
      <SearchContent placeholder="Search transaction" useFor="transaction" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-[15%] h-full bg-mainGreen shadow-md shadow-dark/25 rounded-[8px] text-white flex py-[10px] items-center justify-center"
          >
            <CiFilter className="font-bold text-xl" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white" aria-describedby="Filter content">
          <DialogTitle className="text-darkGreen text-2xl font-semibold text-center">
            Filter History
          </DialogTitle>
          <FilterItem title="Transaction Status">
            <Option
              data={optionTransaction}
              initiateValue={optionTransaction[0]}
              isTransaction
            />
          </FilterItem>
          <FilterItem title="Date">
            <RadioGroup defaultValue="Last 7 Days" className="mt-2">
              <RadioItem value="Last 7 Days" id="r1">
                <RadioGroupItem
                  value={"Last 7 Days"}
                  id={"r1"}
                  className="border-darkGreen"
                  checked={day === "Last 7 Days"}
                  onClick={() => setDay("Last 7 Days")}
                />
              </RadioItem>
              <RadioItem value="Last 30 Days" id="r2">
                <RadioGroupItem
                  value={"Last 30 Days"}
                  id={"r2"}
                  className="border-darkGreen"
                  checked={day === "Last 30 Days"}
                  onClick={() => setDay("Last 30 Days")}
                />
              </RadioItem>
              <RadioItem value="Last 90 Days" id="r3">
                <RadioGroupItem
                  value={"Last 90 Days"}
                  id={"r3"}
                  className="border-darkGreen"
                  checked={day === "Last 90 Days"}
                  onClick={() => setDay("Last 90 Days")}
                />
              </RadioItem>
            </RadioGroup>
          </FilterItem>
          <FilterItem title="Sort">
            <RadioGroup defaultValue="Newest" className="mt-2">
              <RadioItem value="Newest" id="r4">
                <RadioGroupItem
                  value={"Newest"}
                  id={"r4"}
                  className="border-darkGreen"
                  checked={typeTime === "Newest"}
                  onClick={() => setTypeTime("Newest")}
                />
              </RadioItem>
              <RadioItem value="Oldest" id="r5">
                <RadioGroupItem
                  value={"Newest"}
                  id={"r4"}
                  className="border-darkGreen"
                  checked={typeTime === "Oldest"}
                  onClick={() => setTypeTime("Oldest")}
                />
              </RadioItem>
            </RadioGroup>
          </FilterItem>
          <div className="w-full border-t border-darkGrey/40 flex justify-center items-center">
            <div className="flex justify-between items-center w-full mt-2">
              <ButtonBuy className="w-[48%] rounded-[8px] bg-white border-mainGreen text-mainGreen border font-semibold hover:bg-mainGreen hover:text-white">
                Reset
              </ButtonBuy>
              <ButtonBuy
                className="w-[48%] font-semibold rounded-[8px]"
                onClick={handleApply}
              >
                Apply
              </ButtonBuy>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
