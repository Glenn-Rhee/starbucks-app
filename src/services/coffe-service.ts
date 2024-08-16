import { ResponseError } from "@/error/error";
import { ResponsePayload } from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";

export class CoffeService {
  static async register(
    data: CoffeRequest,
    token: string
  ): Promise<ResponsePayload> {
    const tokenDecoded = JWT.decoded(token) as JWTDecoded;
    if (!tokenDecoded) throw new ResponseError(403, "Invalid token!");

    const user = await prismaClient.user.findUnique({
      where: {
        id: tokenDecoded.id,
      },
    });

    if (!user) throw new ResponseError(404, "Oops! user is not found!");

    const newCoffe = await prismaClient.coffe.create({
      data: {
        ...data,
      },
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully add new coffe",
      data: {
        id: newCoffe.id,
        price: newCoffe.price,
      },
    };
  }
}
