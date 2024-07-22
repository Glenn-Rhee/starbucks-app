"use client";
import ButtonBuy from "@/components/ButtonBuy";
import HandlerCoffe from "@/components/HandlerCoffe";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface CoffeItemProps {
  title: string;
  description: string;
  price: number;
}

export default function CoffeItem(props: CoffeItemProps) {
  const { title, description, price } = props;
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="min-w-full py-1 px-2 flex gap-x-2 mt-5 g-red-900 mb-1">
      <div className="flex gap-x-4 min-w-full">
        <div className="flex-grow">
          <Image src={"/coffe.png"} width={60} height={60} alt={"Coffe"} />
        </div>
        <div className=" w-[70%] flex-grow-[2]">
          <h4 className="text-dark text-lg font-semibold">{title}</h4>
          <div className="flex flex-col text-sm text-darkGrey">
            <p className="">{description}</p>
            <span className="">Rp {price.toLocaleString()}</span>
          </div>
          <div
            className={cn("w-full flex gap-x-2 mt-2 items-center", {
              "justify-center": active,
              "justify-end": !active,
            })}
          >
            {active ? (
              <HandlerCoffe setActive={setActive} />
            ) : (
              <ButtonBuy
                onClick={() => setActive(true)}
                className="rounded-[10px] min-w-[6rem]"
              >
                Buy
              </ButtonBuy>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
