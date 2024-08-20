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

    const cartUsers = await prismaClient.cart.findMany({
      where: {
        idUser: decoded.id,
      },
    });

    if (cartUsers.length === 0) {
      await prismaClient.cart.create({
        data: {
          idUser: decoded.id,
          idCoffe,
          quantity: data.quantity,
          size: data.size,
        },
      });
    } else {
      const filteredCart = cartUsers.find(
        (cart) => cart.quantity === data.quantity && cart.size === data.size
      );
      if (!filteredCart) {
        await prismaClient.cart.create({
          data: {
            idUser: decoded.id,
            idCoffe,
            quantity: data.quantity,
            size: data.size,
          },
        });
      } else {
        const quantityUpdated = filteredCart.quantity + data.quantity;
        await prismaClient.cart.update({
          where: {
            id: filteredCart.id,
          },
          data: {
            quantity: quantityUpdated,
          },
        });
      }
    }

    return {
      status: "success",
      message: "Successfully create new cart!",
      statusCode: 201,
      data: null,
    };
  }

  static async getCart(token: string, url: URL): Promise<ResponsePayload> {
    let data: any;
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid token!");

    const idCoffe = url.searchParams.get("idCoffe");
    data = await prismaClient.cart.findMany({
      where: {
        idUser: decoded.id,
      },
    });

    return {
      status: "success",
      message: "Successfully get cart user",
      statusCode: 200,
      data,
    };
  }

  static async deleteCart(token: string, url: URL): Promise<ResponsePayload> {
    const decoded = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid Token!");
    const idCart = url.searchParams.get("id");
    if (!idCart) throw new ResponseError(402, "Id cart is required!");
    const cart = await prismaClient.cart.findUnique({
      where: {
        id: idCart,
      },
    });

    if (!cart) throw new ResponseError(404, "Cart is not found!");

    await prismaClient.cart.delete({
      where: {
        id: idCart,
      },
    });

    return {
      status: "success",
      message: "Successfully deleted one cart",
      statusCode: 201,
    };
  }
}
