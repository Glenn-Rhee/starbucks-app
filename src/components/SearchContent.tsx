"use client";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useSearchCoffe } from "@/store/useSearchCoffe";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDataCoffe } from "@/store/useDataCoffe";
import { useTransaction } from "@/store/useTransaction";

interface SearchContentProps {
  className?: string;
  placeholder: string;
  children?: React.ReactNode;
  useFor: "transaction" | "coffe";
}

export default function SearchContent(props: SearchContentProps) {
  const { className, placeholder, children, useFor } = props;
  const { value, setValue } = useSearchCoffe();
  const { setCoffeData } = useDataCoffe();
  const { setTransaction, setMessage } = useTransaction();
  const { access, setAccess } = useUser();
  const router = useRouter();

  async function handleSearch() {
    if (useFor === "coffe") {
      const response = await fetch(
        "http://localhost:3000" + "/api/coffe?name=" + value,
        {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        }
      );

      const data = (await response.json()) as ResponsePayload;
      if (data.status === "failed") {
        if (data.message.includes("Token")) {
          setAccess("");
          router.push("/auth/login");
          return;
        } else {
          toast(data.status + " " + data.message);
          return;
        }
      }

      setCoffeData(data.data);
    } else {
      const response = await fetch("/api/transaction?title=" + value, {
        method: "GET",
        headers: {
          bearir: access || "",
        },
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        return toast("Failed get transaction", {
          description: dataResponse.message,
          duration: 2500,
        });
      }

      if (dataResponse.data.length === 0) {
        setMessage("No transaction found");
      }

      setTransaction(dataResponse.data);
    }
  }

  return (
    <div
      className={cn(
        "w-[85%] bg-white flex items-center rounded-[9px] px-2 shadow-md py-[0.5px]",
        className
      )}
    >
      <CiSearch className="text-md text-darkGrey" />
      <Input
        type="search"
        placeholder={placeholder}
        className="bg-transparent border-none placeholder:text-darkGrey text-darkGrey"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleSearch}
      />
      {children}
    </div>
  );
}
