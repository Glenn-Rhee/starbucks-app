"use client";
import { Coffe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CoffeItemProps {
  data: Coffe;
}

export default function CoffeItem(props: CoffeItemProps) {
  const { data } = props;
  const src = "/" + data.linkPicture.split("./")[1];

  return (
    <Link
      href={"/order/" + data.id}
      className="min-w-full py-1 px-2 flex gap-x-2 mt-5 g-red-900 mb-1"
    >
      <div className="flex gap-x-4 min-w-full">
        <div className="flex-grow">
          <Image
            src={src}
            width={60}
            height={60}
            alt={data.name}
            className="aspect-square rounded-full "
          />
        </div>
        <div className="w-[70%] flex-grow-[2]">
          <h4 className="text-dark text-lg font-semibold">{data.name}</h4>
          <div className="flex flex-col text-sm text-darkGrey">
            <p className="">{data.description}</p>
            <span className="">Rp {data.price.toLocaleString()}</span>
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
