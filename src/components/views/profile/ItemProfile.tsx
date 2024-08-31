"use client";
import { useDetail } from "@/store/useUser";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface ItemProfileProps {
  label: string;
  keyDetail: string;
  children: React.ReactNode;
  value: string;
}

export default function ItemProfile(props: ItemProfileProps) {
  const { label, children, value, keyDetail } = props;
  const { setValue, setKey } = useDetail();
  // console.log(key);

  return (
    <Link
      href={"/profile/detail"}
      onClick={() => {
        setKey(keyDetail);
        setValue(value);
      }}
      className="flex justify-between px-4 items-center py-3 last:border-none border-b border-dark/25"
    >
      <span className="text-base text-dark">{label}</span>
      <div className="flex items-center gap-x-1">
        {children}
        <MdOutlineKeyboardArrowRight
          className="text-dark font-semibold"
          size={25}
        />
      </div>
    </Link>
  );
}
