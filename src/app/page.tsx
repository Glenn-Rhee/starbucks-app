// @refresh reset
import Container from "@/components/Container";
import BannerMoney from "@/components/views/home/BannerMoney";
import Chart from "@/components/views/home/Chart";
import Recomendation from "@/components/views/home/Recomendation";

export default function HomePage() {
  return (
    <Container>
      <BannerMoney />
      <Chart />
      <Recomendation />
    </Container>
  );
}
