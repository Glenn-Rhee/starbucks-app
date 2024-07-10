import Container from "@/components/Container";
import BannerMoney from "@/components/views/home/BannerMoney";
import Chart from "@/components/views/home/Chart";

export default function HomePage() {
  return (
    <Container>
      <BannerMoney />
      <Chart />
    </Container>
  );
}
