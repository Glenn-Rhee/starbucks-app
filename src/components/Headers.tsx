"use client";

import { FaRegBell } from "react-icons/fa";
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

export default function Headers() {
  const iconStyles =
    "text-2xl text-darkGreen font-semibold outline-none border-none active:outline-none active:border-none";

  return (
    <header className="flex justify-between w-screen px-4 py-3 z-50 items-center bg-white shadow-lg shadow-black/15 rounded-lg sticky top-0">
      <div>
        <h1 className="text-darkGreen font-bold text-2xl">Starbucks</h1>
      </div>
      <div className="flex gap-x-3">
        <div>
          <FaRegBell className={iconStyles} />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HiDotsVertical className={iconStyles} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1">
              <DropdownMenuLabel className="text-darkGreen font-semibold">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropDownItem>
                <IoIosLogOut className="text-darkGreen font-bold text-lg" />
                <span className="text-darkGreen font-semibold">Logout</span>
              </DropDownItem>
              <DropDownItem>
                <MdOutlineLightMode className="text-darkGreen font-bold text-lg" />
                <span className="text-darkGreen font-semibold">Light</span>
              </DropDownItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
