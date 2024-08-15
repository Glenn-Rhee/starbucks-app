import { ResponsePayload } from "@/models/user-model";
import { ZodError } from "zod";
import { ResponseError } from "./error";

export default function responseError(error: any): ResponsePayload {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((data) => data.message);

    return {
      status: "failed",
      message: "Please fill all field properly",
      statusCode: 403,
      error: errorMessages,
    };
  } else if (error instanceof ResponseError) {
    return {
      status: "failed",
      message: error.message,
      statusCode: error.status,
    };
  } else {
    console.log(error);

    return {
      status: "failed",
      message: "Internal server error",
      statusCode: 500,
      error: error,
    };
  }
}
