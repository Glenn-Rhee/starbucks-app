import { Coffe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CardRecomendationProps {
  data: Coffe;
}

export default function CardRecomendation(props: CardRecomendationProps) {
  const { data } = props;

  return (
    <div className="flex items-center mt-5 flex-1 min-w-[13rem] ">
      <Link
        href={"/order/" + data.id}
        className="bg-lightGrey/60 rounded-2xl min-w-full p-4 h-fit"
      >
        <Image
          src={"/" + data.linkPicture.split("./")[1]}
          className="aspect-square mx-auto"
          width={85}
          height={85}
          alt={data.name}
        />
        <div className="mt-3">
          <h5 className="text-dark line-clamp-2 font-bold text-lg">
            {data.name}
          </h5>
          <span className="mt-1 block text-darkGrey font-medium">
            Rp {data.price.toLocaleString()}
          </span>
        </div>
        <span className="min-w-full bg-mainGreen mt-4 flex items-center justify-center py-1 px-2 text-white rounded-[8px]">
          Add
        </span>
      </Link>
    </div>
  );
}
