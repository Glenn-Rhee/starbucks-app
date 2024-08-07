// @refresh reset
import FooterCart from "@/components/views/cart/FooterCart";
import HeaderCart from "@/components/views/cart/Header";
import MainCart from "@/components/views/cart/MainCart";

export default function CartPage() {
  return (
    <>
      <HeaderCart />
      <MainCart />
      <FooterCart />
    </>
  );
}
