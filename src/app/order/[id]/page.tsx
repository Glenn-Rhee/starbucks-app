"use client";
import Loading from "@/components/Loading";
import FooterDetail from "@/components/views/order/detail/FooterDetail";
import HeroProduct from "@/components/views/order/detail/HeroProduct";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { Coffe } from "@prisma/client";
import { useEffect, useState } from "react";

interface DetailCoffeProps {
  params: { id: string };
}

export default function DetailCoffe(props: DetailCoffeProps) {
  const { id } = props.params;
  const [data, setData] = useState<Coffe | null>(null);
  const [loading, setLoading] = useState(false);
  const { access } = useUser();

  useEffect(() => {
    setLoading(true);
    const getOneCoffe = async () => {
      if (access) {
        const response = await fetch(
          "http://localhost:3000" + "/api/coffe?id=" + id,
          {
            method: "GET",
            headers: {
              bearir: access || "",
            },
          }
        );

        const dataResponse = (await response.json()) as ResponsePayload;
        setData(dataResponse.data);
      }
    };

    getOneCoffe();
  }, [id, access]);

  return loading ? (
    <div className="px-4 py-1">
      {data ? (
        <>
          <HeroProduct data={data} />
          <FooterDetail price={data.price} />
        </>
      ) : (
        <Loading className="min-h-screen" />
      )}
    </div>
  ) : (
    <Loading className="min-h-screen" />
  );
}
