"use client";
import { useEffect, useState } from "react";
import ItemPrice from "./ItemPrice";
import { Cart, Coffe } from "@prisma/client";
import { useDataCart } from "@/store/useDataCart";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import Loading from "@/components/Loading";
import {
  deliveryFee,
  getTotalCart,
  orderFee,
  packagingFee,
} from "@/utils/getTotalCart";
import { useDataCoffe } from "@/store/useDataCoffe";

export default function Total() {
  const { coffeData, setCoffeData } = useDataCoffe();
  const { data, empty } = useDataCart();
  const { access } = useUser();

  useEffect(() => {
    if (access && data) {
      const idCoffes = data.map((item) => item.idCoffe);
      const getDataCOffe = async () => {
        const promises = idCoffes.map(async (id) => {
          const response = await fetch("/api/coffe?id=" + id, {
            method: "GET",
            headers: {
              bearir: access || "",
            },
          });

          const dataResponse = (await response.json()) as ResponsePayload;
          if (dataResponse.status === "failed") {
            setCoffeData(null);
            return;
          }

          return dataResponse.data as Coffe;
        });

        const results = (await Promise.all(promises)) as Coffe[];
        setCoffeData(results);
      };

      getDataCOffe();
    }
  }, [data, access, setCoffeData]);

  if (empty) return null;

  if (!coffeData) {
    return <Loading className="min-h-[20vh]" />;
  }

  const total = getTotalCart(data as Cart[], coffeData);

  return (
    <div className="min-w-full flex flex-col gap-y-2 px-2 py-5">
      <ItemPrice title="Total" price={total as number} />
      <ItemPrice title="Delivery fee" price={deliveryFee} />
      <ItemPrice title="Order fee" price={orderFee} />
      <ItemPrice title="Packaging fee" price={packagingFee} />
    </div>
  );
}
