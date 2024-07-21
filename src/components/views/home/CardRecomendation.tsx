"use client";
import ButtonBuy from "@/components/ButtonBuy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

export default function CardRecomendation() {
  const [qty, setQty] = useState<number>(1);
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-x-2 mt-5">
      <div className="bg-lightGrey/60 rounded-2xl p-3 max-w-[180px] ">
        <Image
          src={"/coffe.png"}
          className="aspect-square mx-auto"
          width={85}
          height={85}
          alt="Coffe image"
        />

        <div className="mt-3 bg-red-=">
          <h5 className="text-dark line-clamp-2 font-bold text-lg">
            Mocca Cappucino
          </h5>
          <span className="mt-1 block text-darkGrey font-medium">
            Rp 20.000
          </span>
        </div>
        <div
          className={cn(
            "w-full mt-4 mb-2",
            active ? "flex justify-center items-center gap-x-2" : ""
          )}
        >
          {active ? (
            <>
              <div className="flex justify-around items-center flex-1 text-dark bg-lightGrey rounded-[4px]">
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
              <button
                type="button"
                className="bg-mainGreen p-1 rounded-[5px]"
                onClick={() => setActive(false)}
              >
                <IoMdCheckmark className="text-white" />
              </button>
            </>
          ) : (
            <ButtonBuy
              className="w-full rounded-xl"
              onClick={() => setActive(true)}
            >
              Add
            </ButtonBuy>
          )}
        </div>
      </div>
    </div>
  );
}
