import ItemPrice from "./ItemPrice";

export default function Total() {
  return (
    <div className="min-w-full flex flex-col gap-y-2 px-2 py-5">
      <ItemPrice title="Total" price={25000} />
      <ItemPrice title="Delivery fee" price={2500} />
      <ItemPrice title="Order fee" price={2500} />
      <ItemPrice title="Packaging fee" price={3000} />
    </div>
  );
}
