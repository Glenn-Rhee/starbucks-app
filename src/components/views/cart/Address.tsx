"use client";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { User } from "@prisma/client";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { toast } from "sonner";

interface AddressProps {
  data: User;
}

export default function Address(props: AddressProps) {
  const { data } = props;
  const { access } = useUser();
  const [value, setValue] = useState<string>(data.address || "");

  async function handleAddress() {
    const response = await fetch("/api/user?address=" + value, {
      method: "PATCH",
      headers: {
        bearir: access || "",
      },
    });

    const data = (await response.json()) as ResponsePayload;
    if (data.status === "failed") {
      toast("Error", {
        description: data.message,
      });

      return;
    }
  }

  return (
    <div className="flex min-w-full px-2 py-1 gap-x-2 items-center">
      <MdLocationOn className="text-red-600" />
      <div className="flex flex-1 px-2 justify-between items-center">
        <input
          type="text"
          placeholder="Address"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="address"
          onKeyUp={handleAddress}
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
