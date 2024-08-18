"use client";
import Counter from "@/components/Counter";
import SizeCoffe from "./SizeCoffe";
import { useState } from "react";
import { Coffe } from "@prisma/client";
import { ResponsePayload } from "@/models/user-model";
import { toast } from "sonner";
import ButtonAuth from "../../../ButtonAuth";
import { useQuantity } from "@/store/useQuantity";

interface FooterDetailProps {
  data: Coffe;
  idCoffe: string;
}

export default function FooterDetail(props: FooterDetailProps) {
  const { data, idCoffe } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { qty } = useQuantity();
  const [disable, setDisable] = useState<boolean>(false);
  const [valueActive, setValueActive] = useState<"S" | "M" | "L">("S");

  async function handleAddCart() {
    setLoading(true);
    setDisable(true);
    let size: "Small" | "Medium" | "Large";
    switch (valueActive) {
      case "S":
        size = "Small";
        break;
      case "M":
        size = "Medium";
        break;
      default:
        size = "Large";
        break;
    }

    try {
      const response = await fetch("/api/cart?idCoffe=" + idCoffe, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: qty,
          size: size,
        }),
      });

      const data = (await response.json()) as ResponsePayload;
      if (data.status === "failed") {
        throw new Error(data.message);
      }

      toast("Success", {
        description: data.message,
        duration: 1500,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast("Failed create cart", {
          description: error.message,
        });
      } else {
        toast("Internal server Error!");
      }
    } finally {
      setLoading(false);
      setDisable(false);
    }
  }

  return (
    <footer className="min-w-full flex flex-col fixed bottom-0 left-0 right-0 px-4 py-2">
      <div className="flex flex-col gap-y-4">
        <span className="text-2xl mb-1 font-bold text-dark">
          Rp {data.price.toLocaleString()}
        </span>
      </div>
      <div className="flex gap-x-2 items-center">
        <Counter className="py-2" />
        <div className="flex gap-x-2 items-center">
          <SizeCoffe
            title="S"
            valueActive={valueActive}
            setValueActive={setValueActive}
          />
          <SizeCoffe
            title="M"
            valueActive={valueActive}
            setValueActive={setValueActive}
          />
          <SizeCoffe
            title="L"
            valueActive={valueActive}
            setValueActive={setValueActive}
          />
        </div>
      </div>
      <ButtonAuth
        className="w-full mt-2 py-2 rounded-[8px] bg-mainGreen text-white font-semibold text-lg"
        onSubmit={handleAddCart}
        isLoading={loading}
        disable={disable}
      >
        Add
      </ButtonAuth>
    </footer>
  );
}
