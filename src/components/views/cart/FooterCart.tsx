export default function FooterCart() {
  return (
    <div className="flex flex-col gap-y-2 min-w-full fixed bottom-0 px-4 py-4 bg-white">
      <div className="flex justify-between text-dark">
        <span className="text-xs font-semibold">Starbucks Balance</span>
        <span className="text-sm font-bold">Rp 55.000</span>
      </div>
      <button className="w-full  bg-mainGreen py-2 text-white text-base rounded-[7px] font-semibold">
        Pay Rp 100.000
      </button>
    </div>
  );
}
