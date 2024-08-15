// @refresh reset
"use client";
import TitleAuth from "@/components/views/auth/TitleAuth";
import InputAuth from "../InputAuth";
import { ZodError } from "zod";
import { useEffect, useState } from "react";
import { getErrorMsgs, trimedData, updatedDataError } from "@/utils/authFe";
import ButtonAuth from "../ButtonAuth";
import FooterForm from "../FooterForm";
import LinkAuth from "../LinkAuth";
import { UserValidation } from "@/validation/user-validation";
import { Validation } from "@/validation/validation";
import { toast } from "sonner";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { useRouter } from "next/navigation";

export interface DataForm {
  fullname: string;
  username: string;
  email: string;
  mobilePhone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupViews() {
  const router = useRouter();
  const [data, setData] = useState<DataForm>({
    fullname: "",
    username: "",
    email: "",
    mobilePhone: "",
    password: "",
    confirmPassword: "",
  });
  const [dataError, setDataError] = useState<DataForm>({
    fullname: "",
    username: "",
    email: "",
    mobilePhone: "",
    password: "",
    confirmPassword: "",
  });
  const { setAccess } = useUser();
  const [disable, setDisable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setDataError({
      fullname: "",
      username: "",
      email: "",
      mobilePhone: "",
      password: "",
      confirmPassword: "",
    });

    try {
      setData((prevData) => trimedData(prevData));
      Validation.validate(UserValidation.REGISTRATION, data);
      if (data.password !== data.confirmPassword) {
        setDataError((prev) => ({
          ...prev,
          confirmPassword: "Password and Confirmation Password does not match",
        }));

        return;
      }

      const { confirmPassword, ...newData } = data;

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) throw new Error(response.statusText);

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      const token = dataResponse.data;
      setAccess(token);
      toast("Sign up successfully");
      router.push("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = getErrorMsgs(error);

        setDataError((prevDataError) =>
          updatedDataError(prevDataError, errorMessages)
        );
      } else if (error instanceof Error) {
        toast("Oops something went wrong", { description: error.message });
      } else {
        console.log(error);

        toast("Oops something went wrong", {
          description: "Internal server error",
        });
      }
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
      <TitleAuth>Sign Up</TitleAuth>
      <InputAuth
        placeholder="Full Name"
        type="text"
        onChange={(e) => setData({ ...data, fullname: e.target.value })}
        errorMsg={dataError.fullname}
      />
      <InputAuth
        placeholder="Username"
        type="text"
        onChange={(e) => setData({ ...data, username: e.target.value })}
        errorMsg={dataError.username}
      />
      <InputAuth
        placeholder="Mobile Phone"
        type="text"
        inputMode="numeric"
        onChange={(e) => setData({ ...data, mobilePhone: e.target.value })}
        errorMsg={dataError.mobilePhone}
      />

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
        <LinkAuth href={"/auth/login"}>Already have an account?</LinkAuth>
        <ButtonAuth onSubmit={onSubmit} disable={disable} isLoading={isLoading}>
          Sign up
        </ButtonAuth>
      </FooterForm>
    </form>
  );
}
