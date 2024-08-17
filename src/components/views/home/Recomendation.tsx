// @refresh reset
"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CardRecomendation from "./CardRecomendation";
import { useEffect, useState } from "react";
import { Coffe } from "@prisma/client";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Recomendation() {
  const [data, setData] = useState<Coffe[] | null>(null);
  const { access, setAccess } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (access) {
      const getData = async () => {
        const response = await fetch("/api/coffe?name=classic", {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        });

        const dataReponse = (await response.json()) as ResponsePayload;

        if (dataReponse.status === "failed") {
          setAccess("");
          await fetch("/api/user", {
            method: "DELETE",
          });

          router.push("/auth/login");
          return;
        }

        setData(dataReponse.data);
      };

      getData();
    }
  }, [access, router]);

  return (
    <Card className="mt-5 mb-16 px-4 py-4">
      <div className="flex justify-between items-center text-darkGreen">
        <div>
          <h2 className="font-bold text-xl">For You</h2>
        </div>
        <div>
          <Link
            href={"/order"}
            className="flex items-center gap-x-2 text-sm text-darkGreen"
          >
            See more
            <span>
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
      {!data ? (
        <Loading className="min-h-[70vh]" />
      ) : (
        <div className="flex gap-x-2 overflow-x-auto">
          {data.map((item) => (
            <CardRecomendation key={item.id} data={item} />
          ))}
        </div>
      )}
    </Card>
  );
}
