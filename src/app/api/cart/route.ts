import { ResponseError } from "@/error/error";
import responseError from "@/error/response-error";
import { CreateCart } from "@/models/cart-model";
import { ResponsePayload } from "@/models/user-model";
import { CartService } from "@/services/cart-service";
import { getCookie } from "@/utils/cookies";
import { CartValidation } from "@/validation/cart-validation";
import { Validation } from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let response: ResponsePayload;
  const body = await req.text();
  const data = (await JSON.parse(body)) as CreateCart;
  try {
    const token = getCookie("token");
    const url = new URL(req.url);
    if (!token) throw new ResponseError(403, "Unauthorized token is required!");
    Validation.validate(CartValidation.NEWCART, data);
    response = await CartService.createCart(token.value, data, url);
  } catch (error) {
    response = responseError(error);
  }

  return NextResponse.json(response);
}

export async function GET(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden! Token is required");

    response = await CartService.getCart(token);
  } catch (error) {
    response = responseError(error);
  }
  return NextResponse.json(response);
}
