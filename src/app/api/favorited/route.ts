import { ResponseError } from "@/error/error";
import responseError from "@/error/response-error";
import { ResponsePayload } from "@/models/user-model";
import { FavoriteService } from "@/services/favorite-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let response: ResponsePayload;
  try {
    const token = req.headers.get("bearir");
    if (!token) throw new ResponseError(403, "Forbidden! Token is required");
    const url = new URL(req.url);
    response = await FavoriteService.createFavorite(token, url);
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
    const url = new URL(req.url);

    response = await FavoriteService.getFavorite(token, url);
  } catch (error) {
    response = responseError(error);
  }
  return NextResponse.json(response);
}
