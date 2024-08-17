"use client";
import { Input } from "@/components/ui/input";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbHomeSearch } from "react-icons/tb";

interface PickupPointProps {
  address: string | null;
}

export default function PickupPoint(props: PickupPointProps) {
  const { address } = props;
  const { access, setAccess } = useUser();
  const router = useRouter();
  const [value, setValue] = useState<string | null>(address);

  async function handlePickup() {
    const response = await fetch(
      "http://localhost:3000/api/user?address=" + value,
      {
        method: "PATCH",
        headers: {
          bearir: access || "",
        },
      }
    );

    const data = (await response.json()) as ResponsePayload;

    if (data.status === "failed") {
      setAccess("");
      await fetch("/api/user", {
        method: "DELETE",
      });

      router.push("/auth/login");
      return;
    }

    
  }

  return (
    <div className="mt-3">
      <h3 className="text-dark font-semibold text-lg">Pickup Point</h3>
      <div className="w-full py-1 px-2 bg-white shadow-sm rounded-[5px] shadow-dark/25 flex items-center">
        <TbHomeSearch className="text-2xl text-darkGrey" />
        <Input
          type="search"
          id="pickup"
          placeholder="Pickup Point"
          value={value || ""}
          onKeyUp={handlePickup}
          onChange={(e) => setValue(e.target.value)}
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
