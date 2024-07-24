interface ItemPriceProps {
  title: string;
  price: number;
}

export default function ItemPrice(props: ItemPriceProps) {
  const { title, price } = props;
  return (
    <div className="flex justify-between text-dark text-xs">
      <span>{title}</span>
      <span>{price.toLocaleString("id-ID")}</span>
    </div>
  );
}
