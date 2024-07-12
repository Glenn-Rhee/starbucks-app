import { Input } from "@/components/ui/input";
import { TbHomeSearch } from "react-icons/tb";

export default function PickupPoint() {
  return (
    <div className="mt-3">
      <h3 className="text-dark font-semibold text-lg">Pickup Point</h3>
      <div className="w-full py-1 px-2 bg-white shadow-sm rounded-[5px] shadow-dark/25 flex items-center">
        <TbHomeSearch className="text-2xl text-darkGrey" />
        <Input
          type="text"
          id="pickup"
          placeholder="Pickup Point"
          className="bg-transparent text-sm text-dark shadow-none border-none placeholder-dark placeholder:text-sm focus:border-darkGreen focus:border active:border-red-900"
        />
        <label
          htmlFor="pickup"
          className="text-dark text-right text-sm cursor-pointer hover:underline"
        >
          Edit
        </label>
      </div>
    </div>
  );
}
