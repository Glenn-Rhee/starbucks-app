// @refresh reset
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface BannerMoneyProps {
  data: User;
}

export default function BannerMoney(props: BannerMoneyProps) {
  const { data } = props;

  return (
    <div className="mt-5 relative mx-auto z-10 overflow-hidden bg-mainGreen rounded-3xl">
      <Image
        src={"/logo-home.png"}
        width={184}
        height={142}
        alt="Logo starbucks"
        className="overflow-hidden -z-20"
      />
      <div className="text-white flex justify-between items-end absolute bottom-7 px-5 w-full">
        <div className="flex flex-col justify-center gap-y-3">
          <div className="w-full">
            <h4 className="font-semibold text-base">{data.fullname}</h4>
          </div>
          <div>
            <h4>Balance</h4>
            <span className="text-lg font-semibold">
              Rp. {data.balance.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <div>
          <Link href={"/topup"}>
            <span className="flex items-center gap-x-1">
              Top up <FaArrowRight className="font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
