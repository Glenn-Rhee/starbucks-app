"use client";
import ItemFooter from "@/components/ItemFooter";
import { IoHomeOutline } from "react-icons/io5";
import { TbCup } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function FooterView() {
  const styleIcon =
    "text-4xl font-bold outline-none border-none active:outline-none active:border-none";

  const url = usePathname();

  return (
    <>
      <Link href={"/"}>
        <IoHomeOutline
          className={cn(
            styleIcon,
            url === "/" ? "text-darkGreen" : "text-grey"
          )}
        />
      </Link>
      <Link href={"/order"}>
        <TbCup
          className={cn(
            styleIcon,
            url === "/order" ? "text-darkGreen" : "text-grey"
          )}
        />
      </Link>

      <Link href={"/topup"}>
        <CiCreditCard1
          className={cn(
            styleIcon,
            url === "/topup" ? "text-darkGreen" : "text-grey"
          )}
        />
      </Link>
      <Link href={"/profile"}>
        <CgProfile
          className={cn(
            styleIcon,
            url === "/profile" ? "text-darkGreen" : "text-grey"
          )}
        />
      </Link>
    </>
  );
}
