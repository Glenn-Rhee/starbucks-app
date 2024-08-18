import { Coffe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ItemRecomendationProps {
  data: Coffe;
}

export default function ItemRecomendation(props: ItemRecomendationProps) {
  const { data } = props;
  return (
    <Link
      href={"/order/" + data.id}
      className="p-1 min-w-[180px] border items-center border-darkGrey/30 rounded-[6px] flex gap-x-3"
    >
      <Image
        src={"/" + data.linkPicture.split("./")[1]}
        className="rounded-full aspect-square w-auto text-xs flex items-center justify-center"
        width={60}
        height={60}
        priority
        alt={data.name}
      />
      <div className="flex flex-col">
        <h4 className="text-dark text-sm font-semibold">{data.name}</h4>
        <span className="text-sm text-darkGrey font-light">
          Rp {data.price.toLocaleString("id-ID")}
        </span>
      </div>
    </Link>
  );
}
