import { ResponseError } from "@/error/error";
import responseError from "@/error/response-error";
import { TopupRequest } from "@/models/topup-model";
import { ResponsePayload } from "@/models/user-model";
import { TopupService } from "@/services/topup-service";
import { TopupValidation } from "@/validation/topup-validation";
import { Validation } from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden! Token is required!");
    const body = await req.text();
    const data = JSON.parse(body) as TopupRequest;
    Validation.validate(TopupValidation.TOPUP, data);
    response = await TopupService.createTopup(token, data);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}
