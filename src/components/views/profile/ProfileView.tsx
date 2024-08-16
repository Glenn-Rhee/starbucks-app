// @refresh reset
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Transaction from "./Transaction";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ItemProfile from "./ItemProfile";
import Title from "./Title";
import { User } from "@prisma/client";
import { maskedString } from "@/utils/maskingString";

interface ProfileViewProps {
  data: User;
}

export default function ProfileView(props: ProfileViewProps) {
  const { data } = props;
  const phoneNumber = maskedString(data.mobilePhone);
  const email = maskedString(data.email);

  return (
    <>
      <div className="-mt-6 flex flex-col px-1 pt-2 pb-4 bg-white rounded-[6px] shadow-md min-w-full">
        <div className="w-full flex flex-col items-center border-b border-dark/15 pb-2">
          <span className="font-bold text-lg text-dark">Starbucks Balance</span>
          <span className="text-sm font-semibold text-mainGreen">
            Rp {data.balance.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between mt-3 gap-x-2 px-2 w-full">
          <Transaction
            icon={FaArrowDownLong}
            label="Income"
            balance={data.income}
            className="border-e border-dark/15 bgred-900"
          />
          <Transaction
            icon={FaArrowUpLong}
            label="Outcome"
            balance={data.outcome}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 py-2 bg-white rounded-[6px] shadow-md min-w-full mt-5">
        <ItemProfile label="Change Profile Picture">
          <Image
            src={"/profile-pict.jpg"}
            width={40}
            height={40}
            alt={"Profile"}
            className="rounded-full"
          />
        </ItemProfile>
        <ItemProfile label="Fullname">
          <Title>{data.fullname}</Title>
        </ItemProfile>
        <ItemProfile label="Username">
          <Title>{data.username}</Title>
        </ItemProfile>
        <ItemProfile label="Change Mobile Number">
          <Title>{phoneNumber}</Title>
        </ItemProfile>
        <ItemProfile label="Email">
          <Title>{email}</Title>
        </ItemProfile>
      </div>
      <button className="min-w-full mt-4 p-3 mb-20 bg-mainGreen/5 text-mainGreen border border-mainGreen flex items-center justify-center rounded-[8px] font-semibold">
        Logout
      </button>
    </>
  );
}
