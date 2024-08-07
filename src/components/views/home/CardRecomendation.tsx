import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CardRecomendation() {
  return (
    <div className="flex items-center mt-5 flex-1 min-w-[13rem] ">
      <Link
        href={"/order/4"}
        className="bg-lightGrey/60 rounded-2xl min-w-full p-4 h-fit"
      >
        <Image
          src={"/coffe.png"}
          className="aspect-square mx-auto"
          width={85}
          height={85}
          alt="Coffe image"
        />
        <div className="mt-3">
          <h5 className="text-dark line-clamp-2 font-bold text-lg">
            Mocca Cappucino
          </h5>
          <span className="mt-1 block text-darkGrey font-medium">
            Rp 20.000
          </span>
        </div>
        <span className="min-w-full bg-mainGreen mt-4 flex items-center justify-center py-1 px-2 text-white rounded-[8px]">Add</span>
      </Link>
    </div>
  );
}
