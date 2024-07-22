import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function HeaderCart() {
  return (
    <div className="min-w-full px-2 py-2 sticky bg-white flex justify-center items-center">
      <Link
        className="flex items-center absolute left-2 justify-center p-2"
        href={"/"}
      >
        <FaArrowLeft className="text-xl text-darkGreen" />
      </Link>
      <div className="flex flex-col items-center text-sm">
        <span className="font-bold text-darkGreen text-lg">
          Drink - Sawangan
        </span>
        <span className="font-light text-darkGrey text-xs">
          Delivery fee calculated at 09:20
        </span>
      </div>
    </div>
  );
}
