"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsePayload } from "@/models/user-model";
import { useDataCart } from "@/store/useDataCart";
import { useDataCoffe } from "@/store/useDataCoffe";
import { useUser } from "@/store/useUser";
import {
  deliveryFee,
  getTotalCart,
  orderFee,
  packagingFee,
} from "@/utils/getTotalCart";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function FooterCart() {
  const { coffeData } = useDataCoffe();
  const { data } = useDataCart();
  const fee = deliveryFee + orderFee + packagingFee;
  const { access } = useUser();
  const total = (data && coffeData ? getTotalCart(data, coffeData) : 0) + fee;

  const [dataUser, setDataUser] = useState<User | null>(null);
  useEffect(() => {
    if (access) {
      const getDataUser = async () => {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        });

        const userResponse = (await response.json()) as ResponsePayload;

        if (userResponse.status === "failed") {
          await fetch("/api/user", {
            method: "DELETE",
          });
        }

        setDataUser(userResponse.data as User);
      };

      getDataUser();
    }
  }, [access]);

  return (
    <div className="flex flex-col gap-y-2 min-w-full fixed bottom-0 px-4 py-4 bg-white">
      <div className="flex justify-between text-dark">
        <span className="text-xs font-semibold">Starbucks Balance</span>
        {dataUser ? (
          <span className="text-sm font-bold">
            Rp{dataUser.balance.toLocaleString("id-ID")}
          </span>
        ) : (
          <Skeleton className="text-sm font-bold"></Skeleton>
        )}
      </div>
      <button className="w-full flex items-center justify-center  bg-mainGreen py-2 text-white text-base rounded-[7px] font-semibold">
        {total === fee ? (
          <ImSpinner2 className="animate-spin" />
        ) : (
          <span>Pay Rp {total.toLocaleString("id-ID")}</span>
        )}
      </button>
    </div>
  );
}
