import { ResponseError } from "@/error/error";
import { TopupRequest } from "@/models/topup-model";
import { ResponsePayload } from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";

export class TopupService {
  static async createTopup(
    token: string,
    data: TopupRequest
  ): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid token!");

    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) throw new ResponseError(404, "User not found!");
    await prismaClient.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        balance: user.balance + data.topup,
        income: user.income + data.topup,
      },
    });

    await prismaClient.transaction.create({
      data: {
        balance: data.topup,
        title: "Top up",
        idCart: "",
        status: "COMPLETED",
        idCoffe: "clzw6ga3y0007wqhncf82bmug",
        idUser: decoded.id,
      },
    });

    return {
      status: "success",
      message: "Successfully topup",
      statusCode: 200,
    };
  }
}
