import { ResponseError } from "@/error/error";
import { CreateCart } from "@/models/cart-model";
import { ResponsePayload } from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";

export class CartService {
  static async createCart(
    token: string,
    data: CreateCart,
    url: URL
  ): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) {
      throw new ResponseError(403, "Invalid token!");
    }

    const idCoffe = url.searchParams.get("idCoffe");
    if (!idCoffe) throw new ResponseError(404, "Id not found! Id is required!");

    const newCart = await prismaClient.cart.create({
      data: {
        idUser: decoded.id,
        idCoffe,
        quantity: data.quantity,
        size: data.size,
      },
    });

    return {
      status: "success",
      message: "Successfully create new cart!",
      statusCode: 201,
      data: {
        id: newCart.id,
      },
    };
  }

  static async getCart(token: string): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid token!");

    const cartUser = await prismaClient.cart.findMany({
      where: {
        idUser: decoded.id,
      },
    });

    return {
      status: "success",
      message: "Successfully get cart user",
      statusCode: 200,
      data: cartUser,
    };
  }
}
