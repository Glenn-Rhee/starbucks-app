import { DataForm } from "@/components/views/auth/signup/SignupViews";
import { ZodError } from "zod";

export const trimedData = <T extends Record<string, any>>(data: T) => {
  const trimmedData = { ...data };

  for (let key in trimmedData) {
    if (typeof trimmedData[key as keyof typeof trimmedData] === "string") {
      trimmedData[key as keyof typeof trimmedData] =
        trimmedData[key as keyof typeof trimmedData].trim();
    }
  }

  return trimmedData;
};

export const getErrorMsgs = (error: ZodError) => {
  const errorMessages = error.issues
    .map((data) => ({
      path: data.path[0],
      error: data.message,
    }))
    .filter((obj, i, self) => i === self.findIndex((t) => t.path === obj.path));

  return errorMessages;
};

export const updatedDataError = <T extends Record<string, any>>(
  prevDataError: T,
  errorMessages: { path: string | number; error: string }[]
) => {
  const updatedDataError = { ...prevDataError };

  errorMessages.forEach((data) => {
    const { path, error } = data;
    const key = path as keyof T;

    if (updatedDataError.hasOwnProperty(path)) {
      (updatedDataError[key] as any) = error;
    }
  });
  return updatedDataError;
};
