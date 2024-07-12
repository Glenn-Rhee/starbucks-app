import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CardRecomendation() {
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
        <div className="w-full mt-4">
          <Button className="w-full rounded-xl hover:bg-[#26723E] bg-mainGreen text-white">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
