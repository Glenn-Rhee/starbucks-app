import responseError from "@/error/response-error";
import { ResponsePayload, SignupRequest } from "@/models/user-model";
import { UserService } from "@/services/user-service";
import { UserValidation } from "@/validation/user-validation";
import { Validation } from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data = JSON.parse(body) as SignupRequest;
  let response: ResponsePayload;
  try {
    Validation.validate(UserValidation.REGISTRATION, data);
    response = await UserService.Signup(data);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}
