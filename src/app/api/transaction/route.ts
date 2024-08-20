import { ResponseError } from "@/error/error";
import responseError from "@/error/response-error";
import { ResponsePayload } from "@/models/user-model";
import { TransactionService } from "@/services/transaction-service";
import { TransactionValidation } from "@/validation/transaction-validation";
import { Validation } from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const body = await req.text();
    const data = JSON.parse(body);
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden! Token is required!");
    Validation.validate(TransactionValidation.CREATETRANSACTIONS, data);

    response = await TransactionService.createTransaction(data, token);
  } catch (error) {
    response = responseError(error);
  }
  return NextResponse.json(response);
}

export async function GET(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden!! Token is required");
    const url = new URL(req.url);
    response = await TransactionService.getTransaction(token, url);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}
