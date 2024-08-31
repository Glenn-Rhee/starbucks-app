"use client";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { ResponsePayload } from "@/models/user-model";
import { useDetail, useUser } from "@/store/useUser";
import { getErrorMsgs } from "@/utils/authFe";
import { UserValidation } from "@/validation/user-validation";
import { Validation } from "@/validation/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RiCheckLine } from "react-icons/ri";
import { ZodError } from "zod";

export default function ProfileDetailPage() {
  const { value, setValue, key } = useDetail();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { access } = useUser();

  useEffect(() => {
    if (value === "") router.push("/profile");
  }, [value, router]);

  if (value === "")
    return (
      <Loading className="w-screen h-screen flex items-center justify-center" />
    );

  async function handleEdit() {
    const keySplit = key.split(" ");
    let keyUser: string;
    if (keySplit.length > 1) {
      keySplit[0] = keySplit[0].toLowerCase();
      keyUser = keySplit.join("");
    } else {
      keyUser = key.toLowerCase();
    }

    const data = {
      [keyUser]: value,
    };

    try {
      Validation.validate(UserValidation.EDIT, data);
      const response = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }
      router.push("/profile");
    } catch (error) {
      if (error instanceof ZodError) {
        const message = getErrorMsgs(error);
        setError(message[0].error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Internal Server Error");
      }
    }
  }

  return (
    <Container className="px-3">
      <header className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-x-2 -ms-2">
          <Link href={"/profile"}>
            <IoIosClose className="text- font-bold text-dark" size={35} />
          </Link>
          <span className="text-dark font-bold text-xl tracking-wider">
            {key}
          </span>
        </div>
        <button onClick={handleEdit}>
          <RiCheckLine className="text-lg font-bold text-dark" size={30} />
        </button>
      </header>
      <div className="mt-5">
        <Input
          className="border-dark border rounded-[8px] focus:border-mainGreen focus:border-2"
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <span className="text-xs ms-1 font-semibold text-red-600">{error}</span>
      </div>
    </Container>
  );
}
