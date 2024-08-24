import { ResponsePayload } from "@/models/user-model";
import { getCookie } from "@/utils/cookies";
import { User } from "@prisma/client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default async function HeaderCart() {
  const token = getCookie("token");
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      bearir: token?.value || "",
    },
  });

  const data = (await response.json()) as ResponsePayload;
  if (data.status === "failed") {
    return <h1>{data.message}</h1>;
  }

  const dataUser = data.data as User;
  return (
    <div className="min-w-full px-2 py-2 top-0 scroll-smooth shadow-sm shadow-dark/25 sticky bg-white flex justify-center items-center">
      <Link
        className="flex items-center absolute left-2 justify-center p-2"
        href={"/"}
      >
        <FaArrowLeft className="text-xl text-darkGreen" />
      </Link>
      <div className="flex flex-col items-center text-sm">
        <span className="font-bold text-darkGreen text-lg">
          {dataUser.address ? <span>Drink - {dataUser.address}</span> : "Drink"}
        </span>
      </div>
    </div>
  );
}
