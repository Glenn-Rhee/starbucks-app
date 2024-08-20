"use client";
import ItemRecomendation from "./ItemRecomendation";
import { ResponsePayload } from "@/models/user-model";
import { useEffect, useState } from "react";
import { Coffe } from "@prisma/client";
import { useUser } from "@/store/useUser";
import Loading from "@/components/Loading";
import { useDataCart } from "@/store/useDataCart";

export default function Recomendation() {
  const [data, setData] = useState<Coffe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { access } = useUser();
  const { empty } = useDataCart();
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (access) {
        const response = await fetch("/api/coffe?name=classic", {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        });

        const dataResponse = (await response.json()) as ResponsePayload;
        if (dataResponse.status === "failed") {
          setData(null);
          return;
        }

        setData(dataResponse.data);
      }
    };

    getData();
  }, [access]);

  if (empty) return null;

  return loading ? (
    <div className="px-2 py-5 border-y-lightGrey/35 border-y overflow-x-auto flex gap-x-3">
      {data ? (
        data.map((item) => <ItemRecomendation key={item.id} data={item} />)
      ) : (
        <h3 className="text-center text-dark font-semibold text-lg"></h3>
      )}
    </div>
  ) : (
    <Loading className="min-h-[10vh]" />
  );
}
