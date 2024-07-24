// @refresh reset
import Address from "@/components/views/cart/Address";
import Card from "@/components/views/cart/Card";
import FooterCart from "@/components/views/cart/FooterCart";
import HeaderCart from "@/components/views/cart/Header";
import OrderSummary from "@/components/views/cart/OrderSummary";
import Recomendation from "@/components/views/cart/Recomendation";
import Total from "@/components/views/cart/Total";

export default function CartPage() {
  return (
    <>
      <HeaderCart />
      <Card className="mt-2">
        <Address />
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
      <FooterCart />
    </>
  );
}
