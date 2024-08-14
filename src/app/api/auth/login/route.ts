import responseError from "@/error/response-error";
import { LoginRequest, ResponsePayload } from "@/models/user-model";
import { UserService } from "@/services/user-service";
import { UserValidation } from "@/validation/user-validation";
import { Validation } from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data = JSON.parse(body) as LoginRequest;
  let response: ResponsePayload;
  try {
    Validation.validate(UserValidation.LOGIN, data);
    response = await UserService.Login(data);
  } catch (error) {
    response = responseError(error);
  }
  return NextResponse.json(response);
}
