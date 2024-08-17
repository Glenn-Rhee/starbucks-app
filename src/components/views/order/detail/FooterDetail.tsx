"use client";
import Counter from "@/components/Counter";
import SizeCoffe from "./SizeCoffe";
import { useState } from "react";

interface FooterDetailProps {
  price: number;
}

export default function FooterDetail(props: FooterDetailProps) {
  const { price } = props;
  const [valueActive, setValueActive] = useState<"S" | "M" | "L">("S");

  return (
    <footer className="min-w-full flex flex-col fixed bottom-0 left-0 right-0 px-4 py-2">
      <div className="flex flex-col gap-y-4">
        <span className="text-2xl font-bold text-dark">
          Rp {price.toLocaleString()}
        </span>
        <div className="flex gap-x-2"></div>
      </div>
      <div className="flex gap-x-2 items-center">
        <Counter className="py-2" />
        <div className="flex gap-x-2 items-center">
          <SizeCoffe
            title="S"
            valueActive={valueActive}
            setValueActive={setValueActive}
          />
          <SizeCoffe
            title="M"
            valueActive={valueActive}
            setValueActive={setValueActive}
          />
          <SizeCoffe
            title="L"
            valueActive={valueActive}
            setValueActive={setValueActive}
          />
        </div>
      </div>
      <button className="w-full mt-2 py-2 rounded-[8px] bg-mainGreen text-white font-semibold text-lg">
        Add
      </button>
    </footer>
  );
}
