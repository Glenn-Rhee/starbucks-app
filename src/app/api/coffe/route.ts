import { ResponseError } from "@/error/error";
import responseError from "@/error/response-error";
import { ResponsePayload } from "@/models/user-model";
import { CoffeService } from "@/services/coffe-service";
import { CoffeValidation } from "@/validation/coffe-validation";
import { Validation } from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden!! Token is required");
    const body = await req.text();
    const data = (await JSON.parse(body)) as CoffeRequest;
    Validation.validate(CoffeValidation.REGISTER, data);
    response = await CoffeService.register(data, token);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}
