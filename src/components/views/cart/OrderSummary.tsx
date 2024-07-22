import Link from "next/link";

export default function OrderSummary() {
  return (
    <div className="min-w-full px-2 py-1">
      <div className="flex justify-between items-center">
        <span className="text-base text-dark font-semibold">Order Summary</span>
        <Link href={"/order"} className="text-xs font-semibold text-mainGreen">
          Add Items
        </Link>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex gap-x-3">
          <div className="border-darkGrey/20 h-fit w-fit border p-2 rounded-[5px] flex items-center justify-center text-mainGreen">
            <span className="text-xs">1x</span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-y-[2px]">
              <span className="font-bold text-dark text-sm">Cappucino</span>
              <p className="text-darkGrey font-light text-xs">Extra ice</p>
            </div>
            <span className="text-xs font-bold text-red-600 mt-2">Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
