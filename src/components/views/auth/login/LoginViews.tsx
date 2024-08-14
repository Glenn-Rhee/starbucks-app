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

      alert("Login Success");
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = getErrorMsgs(error);

        setDataError((perevDataError) =>
          updatedDataError(perevDataError, errorMessages)
        );
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
        <ButtonAuth onSubmit={onSubmit} disable={disable}>
          Login
        </ButtonAuth>
      </FooterForm>
    </form>
  );
}
