"use client";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";

export default function Address() {
  const [value, setValue] = useState<string>("Sawangan");

  return (
    <div className="flex min-w-full px-2 py-1 gap-x-2 items-center">
      <MdLocationOn className="text-red-600"/>
      <div className="flex flex-1 px-2 justify-between items-center">
        <input
          type="text"
          placeholder="Address"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="address"
          className="bg-transparent text-sm outline-none text-dark shadow-none border-none placeholder-dark placeholder:text-sm "
        />
        <label
          htmlFor="address"
          className="text-mainGreen cursor-pointer text-xs hover:underline"
        >
          Edit
        </label>
      </div>
    </div>
  );
}
