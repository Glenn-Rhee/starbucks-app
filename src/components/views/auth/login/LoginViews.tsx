"use client";
import { useEffect, useState } from "react";
import InputAuth from "../InputAuth";
import TitleAuth from "../TitleAuth";
import FooterForm from "../FooterForm";
import ButtonAuth from "../ButtonAuth";
import LinkAuth from "../LinkAuth";
import { ZodError } from "zod";
import { getErrorMsgs, trimedData, updatedDataError } from "@/utils/authFe";
import { Validation } from "@/validation/validation";
import { UserValidation } from "@/validation/user-validation";
import { toast } from "sonner";
import { useUser } from "@/store/useUser";
import { ResponsePayload } from "@/models/user-model";
import { useRouter } from "next/navigation";

interface DataForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function LoginViews() {
  const [data, setData] = useState<DataForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [dataError, setDataError] = useState<DataForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [disable, setDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAccess } = useUser();
  const router = useRouter();

  useEffect(() => {
    for (let key in data) {
      if (data[key as keyof typeof data] === "") {
        setDisable(true);
      }

      if (data[key as keyof typeof data] !== "") {
        setDisable(false);
      }
    }
  }, [data]);

  async function onSubmit() {
    setIsLoading(true);
    setDataError({
      email: "",
      password: "",
      confirmPassword: "",
    });

    try {
      setData((prevData) => trimedData(prevData));
      Validation.validate(UserValidation.LOGIN, data);
      if (data.password !== data.confirmPassword) {
        setDataError((prev) => ({
          ...prev,
          confirmPassword: "Password and Confirmation Password does not match",
        }));

        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const dataResponse = (await response.json()) as ResponsePayload;

      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      const token = dataResponse.data;
      setAccess(token);
      toast("Login " + dataResponse.status, {
        description: dataResponse.message,
      });

      router.push("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = getErrorMsgs(error);

        setDataError((perevDataError) =>
          updatedDataError(perevDataError, errorMessages)
        );
      } else if (error instanceof Error) {
        toast("Oops something went wrong", { description: error.message });
      } else {
        toast("Oops something went wrong", {
          description: "Internal server error",
          duration: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <TitleAuth>Login</TitleAuth>
      <InputAuth
        placeholder="Email"
        type="email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        errorMsg={dataError.email}
      />
      <InputAuth
        placeholder="Password"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        errorMsg={dataError.password}
      />

      <InputAuth
        placeholder="Confirmation Password"
        type="password"
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        errorMsg={dataError.confirmPassword}
      />

      <FooterForm>
        <LinkAuth href={"/auth/signup"}>Don&apos;t have an account?</LinkAuth>
        <ButtonAuth onSubmit={onSubmit} disable={disable} isLoading={isLoading}>
          Login
        </ButtonAuth>
      </FooterForm>
    </form>
  );
}
