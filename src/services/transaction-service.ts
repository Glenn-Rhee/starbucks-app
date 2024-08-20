import { ResponseError } from "@/error/error";
import { TransactionRequest } from "@/models/transaction-model";
import { ResponsePayload } from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";
import { Transaction } from "@prisma/client";

interface DataTransaction {
  idCoffe: Transaction["idCoffe"];
  idUser: Transaction["idUser"];
  status: Transaction["status"];
  balance: Transaction["balance"];
  title: Transaction["title"];
  idCart: Transaction["idCart"];
}

export class TransactionService {
  static async createTransaction(
    data: TransactionRequest[],
    token: string
  ): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid Token");
    const dataUser = await prismaClient.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!dataUser) throw new ResponseError(404, "User not found!");

    const newTransaction = data.map<Promise<DataTransaction>>(async (item) => {
      const coffe = await prismaClient.coffe.findUnique({
        where: {
          id: item.idCoffe,
        },
      });

      if (!coffe) throw new ResponseError(403, "Failed create transaction");
      const total = coffe.price * item.quantity;
      await prismaClient.purchased.create({
        data: {
          idUser: decoded.id,
          idCoffe: item.idCoffe,
          balance: item.quantity,
        },
      });

      return {
        idCoffe: item.idCoffe,
        idUser: decoded.id,
        status: "COMPLETED",
        balance: total - total * 2,
        title: coffe.name,
        idCart: item.idCart,
      };
    });

    const result = await Promise.all(newTransaction);
    let pajak = 0;
    const total =
      result.reduce((sum, transaction) => {
        if (transaction.balance < 0 && sum === 0) {
          pajak = -8000;
        }
        return sum + transaction.balance;
      }, 0) + pajak;

    if (dataUser.balance + total < 0) {
      throw new ResponseError(402, "Oops your starbucks balance is low");
    }

    const totalOutcome = total - total * 2;

    await prismaClient.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        outcome: dataUser.outcome + totalOutcome,
        balance: dataUser.balance + total,
      },
    });

    await prismaClient.transaction.createMany({
      data: [...result],
    });

    await prismaClient.cart.deleteMany({
      where: {
        idUser: decoded.id,
      },
    });

    return {
      status: "success",
      message: "Successfully create transaction",
      statusCode: 201,
      data: result,
    };
  }

  static async getTransaction(token: string): Promise<ResponsePayload> {
    const decoded: JWTDecoded | null = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Invalid Token!");

    const data = await prismaClient.transaction.findMany({
      where: {
        idUser: decoded.id,
      },
    });

    return {
      status: "success",
      message: "Successfully gets Transaction",
      statusCode: 200,
      data,
    };
  }
}
