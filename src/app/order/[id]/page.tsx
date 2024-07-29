import FooterDetail from "@/components/views/order/detail/FooterDetail";
import HeroProduct from "@/components/views/order/detail/HeroProduct";

interface DetailCoffeProps {
  params: { id: string };
}

export default function DetailCoffe(props: DetailCoffeProps) {
  const { id } = props.params;

  return (
    <div className="px-4 py-1">
      <HeroProduct />
      <FooterDetail />
    </div>
  );
}
