// @refresh reset
"use client";
import SearchContent from "@/components/SearchContent";
import CoffeItem from "./CoffeItem";
import TypeCoffe from "./TypeCoffe";
import { useEffect, useState } from "react";
import { useUser } from "@/store/useUser";
import { Coffe } from "@prisma/client";
import { ImSpinner2 } from "react-icons/im";
import { ResponsePayload } from "@/models/user-model";
import { useRouter } from "next/navigation";
import { useTypeCoffe } from "@/store/useTypeCoffe";
import { useSearchCoffe } from "@/store/useSearchCoffe";
import { useDataCoffe } from "@/store/useDataCoffe";

export default function Menu() {
  const { access } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { coffeData, setCoffeData } = useDataCoffe();
  const { type } = useTypeCoffe();
  const { value } = useSearchCoffe();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      if (access) {
        const response = await fetch(
          "http://localhost:3000" + "/api/coffe?type=" + type,
          {
            method: "GET",
            headers: {
              bearir: access || "",
            },
          }
        );

        const data = (await response.json()) as ResponsePayload;
        if (data.status === "failed") {
          router.push("/auth/login");
        } else {
          setCoffeData(data.data);
        }
      }
    };

    getData();
  }, [access, isLoading, router, type]);

  return isLoading ? (
    <div className="mt-3 mb-20">
      <h3 className="text-lg font-semibold text-dark">Menu</h3>
      <SearchContent
        className="w-full shadow-sm shadow-dark/25 mb-2"
        placeholder="Find your coffe"
      />
      <div className="bg-white shadow-sm shadow-dark/15 rounded-[5px] flex flex-col gap-y-2">
        {value ? null : <TypeCoffe />}
        {coffeData?.map((item) => (
          <CoffeItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  ) : (
    <>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-dark">Menu</h3>
        <SearchContent
          className="w-full shadow-sm shadow-dark/25 mb-2"
          placeholder="Find your coffe"
        />
      </div>
      <div className="min-w-full flex items-center justify-center min-h-[70vh]">
        <ImSpinner2 className="animate-spin text-mainGreen text-3xl" />
      </div>
    </>
  );
}
