// @refresh reset
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function BannerMoney() {
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
        <div>
          <h4>Money </h4>
          <span className="text-xl font-bold">Rp. 55.000</span>
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
