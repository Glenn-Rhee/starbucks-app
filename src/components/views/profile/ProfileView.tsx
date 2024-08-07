// @refresh reset
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Transaction from "./Transaction";

interface ProfileViewProps {}

export default function ProfileView(props: ProfileViewProps) {
  return (
    <>
      <div className="-mt-6 flex flex-col px-1 pt-2 pb-4 bg-white rounded-[6px] shadow-md min-w-full">
        <div className="w-full flex flex-col items-center border-b border-dark/15 pb-2">
          <span className="font-bold text-lg text-dark">Starbucks Balance</span>
          <span className="text-sm font-semibold text-mainGreen">
            Rp 55.000
          </span>
        </div>
        <div className="flex justify-between mt-3 gap-x-2 px-2 w-full">
          <Transaction
            icon={FaArrowDownLong}
            label="Income"
            balance={25000}
            className="border-e border-dark/15 bgred-900"
          />
          <Transaction icon={FaArrowUpLong} label="Outcome" balance={0} />
        </div>
      </div>
    </>
  );
}
