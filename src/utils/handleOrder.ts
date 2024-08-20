import { ResponsePayload } from "@/models/user-model";
import { Cart } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export async function handleOrder(
  data: Cart[],
  token: string | null,
  setData: (data: Cart[] | null) => void,
  setSuccess: (e: boolean) => void,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  const dataOrder = data.map((item) => {
    return {
      idCart: item.id,
      idCoffe: item.idCoffe,
      quantity: item.quantity,
    };
  });

  const response = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      bearir: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataOrder),
  });

  const dataResponse = (await response.json()) as ResponsePayload;
  setLoading(false);
  if (dataResponse.status === "failed") {
    return toast("Failed create transaction", {
      description: dataResponse.message,
      duration: 1500,
    });
  }
  setSuccess(true);
  setData([]);

  // console.log(dataResponse);
}
