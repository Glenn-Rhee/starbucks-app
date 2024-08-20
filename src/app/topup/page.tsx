"use client";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { TopupValidation } from "@/validation/topup-validation";
import { Validation } from "@/validation/validation";
import { KeyboardEvent, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

export default function TopuopPage() {
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { access } = useUser();

  useEffect(() => {
    if (value !== "") {
      setDisabled(false);
    }

    if (value === "") {
      setDisabled(true);
    }
  }, [value]);

  async function handleTopup() {
    setLoading(true);
    try {
      const dataNumber = +value.split(".").join("");

      const data = { topup: dataNumber };
      Validation.validate(TopupValidation.TOPUP, data);
      const response = await fetch("/api/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          bearir: access || "",
        },
        body: JSON.stringify(data),
      });

      const dataresponse = (await response.json()) as ResponsePayload;
      if (dataresponse.status === "failed") {
        toast("Failed topup", {
          description: dataresponse.message,
          duration: 2000,
        });

        return;
      }

      toast("Topup success", {
        duration: 1500,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setValue("");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  function handlekeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const filteredValue = e.currentTarget.value.replace(/[^0-9]/g, "");
    const formatted = filteredValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setValue(formatted);
    setDisabled(false);
  }

  return (
    <div className="w-full">
      <div className="w-full min-h-[15vh] bg-mainGreen" />
      <Container className="w-full -mt-12">
        <div className="bg-white rounded-[4px] px-4 py-5 shadow-dark/20 shadow-md">
          <div className="flex flex-col gap-y-1">
            <span className="text-xs text-dark">Top Up Amount</span>
            <Input
              className="rounded-[4px] border-grey/80 placeholder:text-darkGrey text-darkGrey"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={value}
              onKeyUp={handlekeyUp}
              onChange={(e) => setValue(e.target.value)}
            />
            {error !== "" ? (
              <span className="text-xs font-semibold text-red-600">
                {error}
              </span>
            ) : null}
          </div>
        </div>
        <div className="left-0 fixed bottom-8 min-w-full px-4">
          <button
            disabled={disabled || loading}
            onClick={handleTopup}
            className={cn(
              "w-full flex items-center justify-center text-white font-semibold min-h-10 rounded-[8px] hover:bg-green-700 transition duration-75 bg-mainGreen",
              {
                "bg-slate-600/40 cursor-not-allowed hover:bg-slate-600/40":
                  disabled,
                "cursor-not-allowed bg-green-700": loading,
              }
            )}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              <span>Top Up</span>
            )}
          </button>
        </div>
      </Container>
    </div>
  );
}
