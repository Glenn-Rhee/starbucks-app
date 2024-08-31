import { ResponseError } from "@/error/error";
import responseError from "@/error/response-error";
import { EditRequest, ResponsePayload } from "@/models/user-model";
import { UserService } from "@/services/user-service";
import { getCookie } from "@/utils/cookies";
import { UserValidation } from "@/validation/user-validation";
import { Validation } from "@/validation/validation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden!! Token is required");

    response = await UserService.getUser(token);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}

export async function DELETE(req: NextRequest) {
  try {
    const token = getCookie("token");
    if (!token) throw new ResponseError(403, "Forbidden logout, login first!");

    cookies().delete("token");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export async function PATCH(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = getCookie("token");
    const body = await req.text();
    const data = JSON.parse(body) as EditRequest;
    if (!token) throw new ResponseError(403, "Unathorized token is required!");

    const url = new URL(req.url);
    Validation.validate(UserValidation.EDIT, data);
    response = await UserService.editUser(token.value, url, data);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}
