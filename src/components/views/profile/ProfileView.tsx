// @refresh reset
"use client";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Transaction from "./Transaction";
import Image from "next/image";
import ItemProfile from "./ItemProfile";
import Title from "./Title";
import { User } from "@prisma/client";
import { maskedString } from "@/utils/maskingString";
import { useUser } from "@/store/useUser";
import { useRouter } from "next/navigation";

interface ProfileViewProps {
  data: User;
}

export default function ProfileView(props: ProfileViewProps) {
  const { data } = props;
  const { setAccess } = useUser();
  const router = useRouter();
  const phoneNumber = maskedString(data.mobilePhone);
  const email = maskedString(data.email);

  async function handleLogout() {
    await fetch("/api/user", {
      method: "DELETE",
    });

    setAccess("");

    router.push("/auth/login");
  }

  return (
    <>
      <div className="-mt-6 flex flex-col px-1 pt-2 pb-4 bg-white rounded-[6px] shadow-md min-w-full">
        <div className="w-full flex flex-col items-center border-b border-dark/15 pb-2">
          <span className="font-bold text-lg text-dark">Starbucks Balance</span>
          <span className="text-sm font-semibold text-mainGreen">
            Rp {data.balance.toLocaleString("id-ID")}
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
        <ItemProfile
          label="Change Profile Picture"
          keyDetail="Profile Picture"
          value={data.linkProfilePicture || ""}
        >
          <Image
            src={"/profile-pict.jpg"}
            width={40}
            height={40}
            alt={"Profile"}
            className="rounded-full"
          />
        </ItemProfile>
        <ItemProfile
          label="Fullname"
          value={data.fullname}
          keyDetail="Fullname"
        >
          <Title>{data.fullname}</Title>
        </ItemProfile>
        <ItemProfile
          label="Username"
          keyDetail="Username"
          value={data.username}
        >
          <Title>{data.username}</Title>
        </ItemProfile>
        <ItemProfile
          label="Change Mobile Number"
          keyDetail="Mobile Phone"
          value={data.mobilePhone}
        >
          <Title>{phoneNumber}</Title>
        </ItemProfile>
        <ItemProfile label="Email" value={data.email} keyDetail="Email">
          <Title>{email}</Title>
        </ItemProfile>
      </div>
      <button
        className="min-w-full mt-4 p-3 mb-20 bg-mainGreen/5 text-mainGreen border border-mainGreen flex items-center justify-center rounded-[8px] font-semibold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
