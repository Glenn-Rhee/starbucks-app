// @refresh reset
import Container from "@/components/Container";
import Menu from "@/components/views/order/Menu";
import PickupPoint from "@/components/views/order/PickupPoint";
import { ResponsePayload } from "@/models/user-model";
import { getCookie } from "@/utils/cookies";

export default async function OrderPage() {
  const token = getCookie("token");
  const response = await fetch(process.env.BASE_URL + "/api/user", {
    method: "GET",
    headers: {
      bearir: token?.value || "",
    },
  });

  const data = (await response.json()) as ResponsePayload;
  return (
    <Container>
      <PickupPoint address={data.data.address} />
      <Menu />
    </Container>
  );
}
