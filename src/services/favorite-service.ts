import { ResponseError } from "@/error/error";
import { ResponsePayload } from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";

export class FavoriteService {
  static async createFavorite(
    token: string,
    url: URL
  ): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid Token!");

    const idCoffe = url.searchParams.get("idCoffe");
    const idFav = url.searchParams.get("idFav");
    let message = "Successfully add favorited coffe";
    let newFavorite: any = null;

    if (!idCoffe)
      throw new ResponseError(402, "Missing id Coffe, id Coffe is required");

    const favorite = await prismaClient.favorite.findFirst({
      where: {
        idCoffe,
        idUser: decoded.id,
      },
    });

    if (!favorite) {
      newFavorite = await prismaClient.favorite.create({
        data: {
          idCoffe,
          idUser: decoded.id,
        },
      });
    } else {
      if (idFav === "" || !idFav)
        throw new ResponseError(403, "For delete idFav is required");
      const favoriteItem = await prismaClient.favorite.findUnique({
        where: {
          id: idFav,
        },
      });

      if (!favoriteItem)
        throw new ResponseError(404, "Oops! Cannot find your favorite!");

      await prismaClient.favorite.delete({
        where: {
          id: idFav,
        },
      });

      message = "Successfully delete favorited coffe";
    }

    return {
      status: "success",
      message,
      statusCode: 200,
      data: newFavorite,
    };
  }

  static async getFavorite(token: string, url: URL): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid Token!");
    const idCoffe = url.searchParams.get("idCoffe");
    if (!idCoffe)
      throw new ResponseError(402, "Missing id Coffe, id Coffe is required");
    let data: any = null;
    const dataFavorite = await prismaClient.favorite.findFirst({
      where: {
        idCoffe,
        idUser: decoded.id,
      },
    });

    const coffeFavoriteCount = await prismaClient.favorite.count({
      where: {
        idCoffe,
      },
    });

    if (dataFavorite) {
      data = dataFavorite;
    }

    return {
      status: "success",
      message: "Successfully get favorite",
      statusCode: 200,
      data: { ...data, coffeFav: coffeFavoriteCount },
    };
  }
}
