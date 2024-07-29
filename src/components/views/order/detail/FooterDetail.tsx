import Counter from "@/components/Counter";
import Image from "next/image";
import SizeCoffe from "./SizeCoffe";

export default function FooterDetail() {
  return (
    <footer className="min-w-full flex flex-col fixed bottom-0 left-0 right-0 px-4 py-2">
      <div className="flex flex-col gap-y-4">
        <span className="text-2xl font-bold text-dark">Rp 20.000</span>
        <div className="flex gap-x-2"></div>
      </div>
      <div className="flex gap-x-2 items-center">
        <Counter className="py-2" />
        <div className="flex gap-x-2 items-center">
          <SizeCoffe src="/small.png" size={22} title="S" />
          <SizeCoffe src="/medium.png" size={26} title="M" />
          <SizeCoffe src="/large.png" size={30} title="l" />
        </div>
      </div>
      <button className="w-full mt-2 py-2 rounded-[8px] bg-mainGreen text-white font-semibold text-lg">
        Add
      </button>
    </footer>
  );
}
