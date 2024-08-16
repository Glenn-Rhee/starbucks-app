"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CoffeItemProps {
  title: string;
  description: string;
  price: number;
}

export default function CoffeItem(props: CoffeItemProps) {
  const { title, description, price } = props;

  return (
    <Link
      href={"/order/4"}
      className="min-w-full py-1 px-2 flex gap-x-2 mt-5 g-red-900 mb-1"
    >
      <div className="flex gap-x-4 min-w-full">
        <div className="flex-grow">
          <Image
            src={"/coffe.png"}
            width={60}
            height={60}
            alt={"Coffe"}
            className="aspect-square"
          />
        </div>
        <div className=" w-[70%] flex-grow-[2]">
          <h4 className="text-dark text-lg font-semibold">{title}</h4>
          <div className="flex flex-col text-sm text-darkGrey">
            <p className="">{description}</p>
            <span className="">Rp {price.toLocaleString()}</span>
          </div>
          <div className="w-full flex gap-x-2 mt-2 items-center justify-end">
            <span className="rounded-[10px] bg-mainGreen text-white flex items-center justify-center py-1 w-1/2">
              Buy
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
