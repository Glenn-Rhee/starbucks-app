"use client";
import Link from "next/link";
import Item from "./Item";
import { useEffect } from "react";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import Loading from "@/components/Loading";
import { useDataCart } from "@/store/useDataCart";
import EmptyCart from "./EmptyCart";
import SuccessOrder from "./SuccessOrder";

export default function OrderSummary() {
  const { access } = useUser();
  const { data, setData, setEmpty, success } = useDataCart();
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

  useEffect(() => {
    if (data && data.length === 0) {
      setEmpty(true);
    }

    if (data && data.length > 0) {
      setEmpty(false);
    }
  }, [data, setEmpty]);

  return data ? (
    <div className="min-w-full px-2 py-1">
      {data.length === 0 ? null : (
        <div className="flex justify-between items-center">
          <span className="text-base text-dark font-semibold">
            Order Summary
          </span>
          <Link
            href={"/order"}
            className="text-xs font-semibold text-mainGreen"
          >
            Add Items
          </Link>
        </div>
      )}
      {data.length === 0 ? (
        success ? (
          <SuccessOrder />
        ) : (
          <EmptyCart />
        )
      ) : (
        data.map((item) => <Item key={item.id} data={item} />)
      )}
    </div>
  ) : (
    <Loading className="min-w-[40vh" />
  );
}
