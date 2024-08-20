// @refresh reset
import Container from "@/components/Container";
import BannerMoney from "@/components/views/home/BannerMoney";
import Chart from "@/components/views/home/Chart";
import Recomendation from "@/components/views/home/Recomendation";
import { ResponsePayload } from "@/models/user-model";
import { getCookie } from "@/utils/cookies";

export default async function HomePage() {
  const baseUrl = process.env.BASE_URL;
  const token = getCookie("token");
  const response = await fetch(baseUrl + "/api/user", {
    method: "GET",
    headers: {
      bearir: token?.value || "",
    },
  });

  const data = (await response.json()) as ResponsePayload;
  
  return (
    <Container>
      <BannerMoney data={data.data} />
      <Chart data={data.data} />
      <Recomendation />
    </Container>
  );
}
