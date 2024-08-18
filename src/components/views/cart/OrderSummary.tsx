"use client";
import Link from "next/link";
import Item from "./Item";
import { useEffect, useState } from "react";
import { Cart } from "@prisma/client";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import Loading from "@/components/Loading";
import { useDataCart } from "@/store/useDataCart";

export default function OrderSummary() {
  const { access } = useUser();
  const { data, setData } = useDataCart();
  useEffect(() => {
    const getData = async () => {
      if (access) {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        });

        const dataResponse = (await response.json()) as ResponsePayload;
        setData(dataResponse.data);
      }
    };

    getData();
  }, [access, setData]);

  return data ? (
    <div className="min-w-full px-2 py-1">
      <div className="flex justify-between items-center">
        <span className="text-base text-dark font-semibold">Order Summary</span>
        <Link href={"/order"} className="text-xs font-semibold text-mainGreen">
          Add Items
        </Link>
      </div>
      {data.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  ) : (
    <Loading className="min-w-[40vh" />
  );
}
