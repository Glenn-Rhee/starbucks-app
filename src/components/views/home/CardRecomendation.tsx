"use client";
import ButtonBuy from "@/components/ButtonBuy";
import HandlerCoffe from "@/components/HandlerCoffe";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function CardRecomendation() {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="flex items-center mt-5 flex-1 min-w-[13rem] ">
      <div className="bg-lightGrey/60 rounded-2xl min-w-full p-4 h-fit">
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
            "w-full mt-4 mb-4",
            active ? "flex justify-center items-center gap-x-2" : ""
          )}
        >
          {active ? (
            <HandlerCoffe setActive={setActive} className="w-full gap-x-0" />
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
