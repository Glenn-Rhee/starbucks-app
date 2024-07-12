"use client";
import { IoHomeOutline } from "react-icons/io5";
import { TbCup } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiDocumentText } from "react-icons/ti";

export default function FooterView() {
  const styleIcon =
    "text-3xl font-bold outline-none border-none active:outline-none active:border-none";

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

      <Link href={"/transaction"}>
        <TiDocumentText
          className={cn(
            styleIcon,
            url === "/transaction" ? "text-darkGreen" : "text-grey"
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
