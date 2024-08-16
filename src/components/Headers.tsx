"use client";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import DropDownItem from "./DropDownItem";
import { usePathname, useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";

export default function Headers() {
  const pathName = usePathname();
  const router = useRouter();
  let title;
  switch (pathName) {
    case "/transaction":
      title = "Transaction";
      break;
    case "/order":
      title = "Order";
      break;
    default:
      title = "Starbucks";
      break;
  }

  const iconStyles =
    "text-xl text-darkGreen font-semibold outline-none border-none active:outline-none active:border-none";

  if (pathName === "/cart") {
    return null;
  }

  if (pathName.includes("/auth/")) return null;

  async function handleLogout() {
    await fetch("/api/user", {
      method: "DELETE",
    });

    router.push("/auth/login");
  }

  return (
    <header className="flex justify-between w-screen px-4 py-3 z-50 items-center bg-white shadow-lg shadow-black/15 rounded-lg sticky top-0">
      <Link href={"/"}>
        <h1 className="text-darkGreen font-bold text-xl">{title}</h1>
      </Link>
      <div className="flex gap-x-3">
        <Link href={"/cart"}>
          <IoCartOutline className={iconStyles} />
        </Link>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HiDotsVertical className={iconStyles} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 bg-white">
              <DropdownMenuLabel className="text-darkGreen ">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropDownItem>
                <button
                  className="flex items-center gap-x-3"
                  onClick={handleLogout}
                >
                  <IoIosLogOut className="text-darkGreen font-bold text-lg" />
                  <span className="text-darkGreen ">Logout</span>
                </button>
              </DropDownItem>
              <DropDownItem>
                <MdOutlineLightMode className="text-darkGreen font-bold text-lg" />
                <span className="text-darkGreen ">Light</span>
              </DropDownItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
