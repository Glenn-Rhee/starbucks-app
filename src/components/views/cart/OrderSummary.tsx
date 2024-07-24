import Link from "next/link";
import Item from "./Item";

export default function OrderSummary() {
  return (
    <div className="min-w-full px-2 py-1">
      <div className="flex justify-between items-center">
        <span className="text-base text-dark font-semibold">Order Summary</span>
        <Link href={"/order"} className="text-xs font-semibold text-mainGreen">
          Add Items
        </Link>
      </div>
      <Item qty={2} title={"Cappuccino"} size={"Large"} price={25000} />
      <Item qty={2} title={"Cappuccino"} size={"Large"} price={25000} />
      <Item qty={2} title={"Cappuccino"} size={"Large"} price={25000} />
      <Item qty={2} title={"Cappuccino"} size={"Large"} price={25000} />
    </div>
  );
}
