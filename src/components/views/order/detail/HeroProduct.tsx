import { Coffe } from "@prisma/client";
import Image from "next/image";

interface HeroProductProps {
  data: Coffe;
}

export default function HeroProduct(props: HeroProductProps) {
  const { data } = props;

  return (
    <div className="flex flex-col mt-8 mb-14">
      <Image
        src={"/" + data.linkPicture.split("./")[1]}
        className="mx-auto mb-6 rounded-[10px]"
        width={160}
        height={160}
        alt="Coffe"
      />
      <div className="flex flex-col gap-y-1 mt-3 tracking-wide">
        <h3 className="text-dark text-lg font-bold">{data.name}</h3>
        <p className="text-sm text-darkGrey font-light">{data.description} </p>
      </div>
    </div>
  );
}
