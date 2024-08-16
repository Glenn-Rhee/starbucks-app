import { User } from "@prisma/client";
import Image from "next/image";

interface HeaderProfileProps {
  data: User;
}

export default function HeaderProfile(props: HeaderProfileProps) {
  const { data } = props;
  return (
    <div className="w-screen bg-mainGreen px-4 pt-5 pb-8">
      <div className="flex items-center gap-x-4">
        <Image
          src={"/profile-pict.jpg"}
          width={70}
          height={70}
          alt={"Profile"}
          className="w-auto rounded-full"
        />
        <div className="text-white">
          <h5 className="text-white text-lg font-bold">{data.fullname}</h5>
          <p className="font-light text-sm">{data.mobilePhone}</p>
        </div>
      </div>
    </div>
  );
}
