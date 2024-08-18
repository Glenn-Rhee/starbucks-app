"use client";
import Loading from "@/components/Loading";
import FooterDetail from "@/components/views/order/detail/FooterDetail";
import HeroProduct from "@/components/views/order/detail/HeroProduct";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { Coffe } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DetailCoffeProps {
  params: { id: string };
}

export default function DetailCoffe(props: DetailCoffeProps) {
  const { id } = props.params;
  const [data, setData] = useState<Coffe | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
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
        if (dataResponse.statusCode === 404) {
          setIsNotFound(true);
          setData(null);
          return;
        }

        setData(dataResponse.data);
      }
    };

    getOneCoffe();
  }, [id, access]);

  return loading ? (
    data ? (
      <div className="px-4 py-1">
        <HeroProduct data={data} />
        <FooterDetail data={data} idCoffe={id} />
      </div>
    ) : isNotFound ? (
      <div className="flex h-[80vh] text-2xl text-mainGreen font-bold w-screen items-center justify-center">
        <div className="flex flex-col justify-center text-center">
          <h1>Coffe is not found!</h1>
          <Link
            className="text-dark text-sm font-normal hover:underline"
            href={"/"}
          >
            Back to home
          </Link>
        </div>
      </div>
    ) : null
  ) : (
    <Loading className="min-h-screen" />
  );
}
