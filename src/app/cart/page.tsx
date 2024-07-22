// @refresh reset
import Address from "@/components/views/cart/Address";
import Card from "@/components/views/cart/Card";
import HeaderCart from "@/components/views/cart/Header";
import OrderSummary from "@/components/views/cart/OrderSummary";

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
    </>
  );
}
