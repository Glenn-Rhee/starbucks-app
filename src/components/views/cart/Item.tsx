"use client";
import { ResponsePayload } from "@/models/user-model";
import { useDataCart } from "@/store/useDataCart";
import { useUser } from "@/store/useUser";
import { Cart, Coffe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ItemProps {
  data: Cart;
}

export default function Item(props: ItemProps) {
  const { data } = props;
  const { access } = useUser();
  const router = useRouter();
  const { data: dataCart, setData, dataToBe, setDataToBe } = useDataCart();
  const [dataCoffe, setDataCoffe] = useState<Coffe | null | string>(null);
  useEffect(() => {
    const getOneCoffe = async () => {
      if (access) {
        const response = await fetch("/api/coffe?id=" + data.idCoffe, {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        });

        const dataResponse = (await response.json()) as ResponsePayload;
        if (dataResponse.status === "failed") {
          setDataCoffe(dataResponse.message);
          return;
        }

        setDataCoffe(dataResponse.data);
      }
    };
    getOneCoffe();
  }, [access, data.idCoffe]);
  const totalPrice =
    dataCoffe && dataCoffe !== ""
      ? data.quantity * (dataCoffe as Coffe).price
      : 0;

  if (!dataCoffe) {
    return <p className="text-center text-red-600 text-lg font-semibold"></p>;
  }

  if (typeof dataCoffe === "string") {
    return (
      <p className="text-center text-red-600 text-lg font-semibold">
        {dataCoffe}
      </p>
    );
  }

  async function handleDelete() {
    const response = await fetch("/api/cart?id=" + data.id, {
      method: "DELETE",
      headers: {
        bearir: access || "",
      },
    });

    const dataResponse = (await response.json()) as ResponsePayload;
    if (dataResponse.status === "failed") {
      toast("Failed delete cart", {
        description: dataResponse.message,
        duration: 1500,
      });

      return;
    }

    const newDataCart = dataCart?.filter((cart) => cart.id !== data.id);
    if (!newDataCart) return;
    setData(newDataCart);
    toast("Success", {
      description: dataResponse.message,
      duration: 1500,
    });

    router.refresh();
  }

  console.log(dataToBe);

  return (
    <div className="flex justify-between mt-5">
      <div className="flex gap-x-3">
        <div className="border-darkGrey/20 h-fit w-fit border p-2 rounded-[5px] flex items-center justify-center text-mainGreen">
          <span className="text-xs">{data.quantity}x</span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-[2px]">
            <span className="font-bold text-dark text-sm">
              {dataCoffe.name}
            </span>
            <p className="text-darkGrey font-light text-xs">{data.size}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            {/* <button
              className="text-xs font-bold text-mainGreen h-fit w-fit"
              onClick={() => router.push("/order/" + data.idCoffe)}
            >
              Edit
            </button> */}
            <button
              className="text-xs font-bold text-red-600 h-fit w-fit"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <span className="text-xs text-darkGrey font-light">
        Rp {totalPrice.toLocaleString("id-ID")}
      </span>
    </div>
  );
}
