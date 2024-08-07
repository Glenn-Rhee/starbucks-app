import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface ItemProfileProps {
  label: string;
  children: React.ReactNode;
}

export default function ItemProfile(props: ItemProfileProps) {
  const { label, children } = props;

  return (
    <div className="flex justify-between px-4 items-center py-3 last:border-none border-b border-dark/25">
      <span className="text-base text-dark">{label}</span>
      <div className="flex items-center gap-x-1">
        {children}
        <MdOutlineKeyboardArrowRight
          className="text-dark font-semibold"
          size={25}
        />
      </div>
    </div>
  );
}
