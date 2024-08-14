// @refresh reset
"use client";
import TitleAuth from "@/components/views/auth/TitleAuth";
import InputAuth from "../InputAuth";
import { ZodError } from "zod";
import { useEffect, useState } from "react";
import { getErrorMsgs, trimedData, updatedDataError } from "@/utils/authFe";
import ButtonAuth from "../ButtonAuth";
import FooterForm from "../FooterForm";
import { formSignupSchema } from "@/lib/zod";
import LinkAuth from "../LinkAuth";

export interface DataForm {
  fullname: string;
  username: string;
  email: string;
  mobilePhone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupViews() {
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

  const [disable, setDisable] = useState<boolean>(false);

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

  function onSubmit() {
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
      formSignupSchema.parse(data);
      if (data.password !== data.confirmPassword) {
        setDataError((prev) => ({
          ...prev,
          confirmPassword: "Password and Confirmation Password does not match",
        }));

        return;
      }

      alert("Signup berhasil");
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = getErrorMsgs(error);

        setDataError((prevDataError) =>
          updatedDataError(prevDataError, errorMessages)
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
        <ButtonAuth onSubmit={onSubmit} disable={disable}>
          Sign up
        </ButtonAuth>
      </FooterForm>
    </form>
  );
}
