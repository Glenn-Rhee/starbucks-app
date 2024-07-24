import Image from "next/image";

export default function ItemRecomendation() {
  return (
    <div className="p-3 min-w-[180px] border items-center border-darkGrey/30 rounded-[6px] flex gap-x-3">
      <Image src={"/coffe.png"} width={60} height={60} alt={"Coffe"} />
      <div className="flex flex-col">
        <h4 className="text-dark text-sm font-semibold">Cappuccino</h4>
        <span className="text-sm text-darkGrey font-light">Rp 25.000</span>
      </div>
    </div>
  );
}
