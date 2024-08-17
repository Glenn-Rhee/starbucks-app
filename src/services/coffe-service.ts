import { ResponseError } from "@/error/error";
import { ResponsePayload } from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";
import { Coffe } from "@prisma/client";

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

  static async getCoffese(token: string, url: URL): Promise<ResponsePayload> {
    const tokenDecoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!tokenDecoded) throw new ResponseError(403, "Invalid token!!!");
    let dataCoffe: Coffe[];
    const type: Coffe["type"] | null = url.searchParams.get("type") as
      | Coffe["type"]
      | null;
    const id: string | null = url.searchParams.get("id");
    const nameCoffe: string | null = url.searchParams.get("name");

    if (id) {
      const dataCoffeById = await prismaClient.coffe.findUnique({
        where: {
          id,
        },
      });

      if (!dataCoffeById)
        throw new ResponseError(404, `Product with id ${id} is not found!`);

      return {
        status: "success",
        message: "Successfully get coffe",
        statusCode: 200,
        data: dataCoffeById,
      };
    }

    if (type) {
      dataCoffe = await prismaClient.coffe.findMany({
        where: {
          type,
        },
      });

      if (dataCoffe.length < 1)
        throw new ResponseError(
          404,
          "Coffe with type " + type + " is not found!"
        );
    } else if (nameCoffe) {
      dataCoffe = await prismaClient.coffe.findMany({
        where: {
          name: {
            contains: nameCoffe,
          },
        },
      });

      if (!dataCoffe)
        throw new ResponseError(404, `${nameCoffe} is not found!`);
      
    } else {
      dataCoffe = await prismaClient.coffe.findMany();
    }

    return {
      status: "success",
      message: "Successfully get coffe",
      statusCode: 200,
      data: dataCoffe,
    };
  }
}
