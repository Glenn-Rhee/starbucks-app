import Address from "@/components/views/cart/Address";
import Card from "@/components/views/cart/Card";
import OrderSummary from "@/components/views/cart/OrderSummary";
import Recomendation from "@/components/views/cart/Recomendation";
import Total from "@/components/views/cart/Total";
import { ResponsePayload } from "@/models/user-model";
import { getCookie } from "@/utils/cookies";
import { User } from "@prisma/client";

export default async function MainCart() {
  const token = getCookie("token");
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      bearir: token?.value || "",
    },
  });

  const data = (await response.json()) as ResponsePayload;
  if (data.status === "failed") {
    <h1>{data.message}</h1>;
  }

  const dataUser = data.data as User;

  return (
    <>
      <Card className="mt-2">
        <Address data={dataUser} />
      </Card>
      <Card className="mt-2">
        <OrderSummary />
      </Card>
      <Card className="mt-2">
        <Recomendation />
      </Card>
      <Card className="mt-1 mb-20">
        <Total />
      </Card>
    </>
  );
}
