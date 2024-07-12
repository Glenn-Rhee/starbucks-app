// @refresh reset
import Container from "@/components/Container";
import Menu from "@/components/views/order/Menu";
import PickupPoint from "@/components/views/order/PickupPoint";

export default function OrderPage() {
  return (
    <Container>
      <PickupPoint />
      <Menu />
    </Container>
  );
}
