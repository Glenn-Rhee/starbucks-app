import { ResponseError } from "@/error/error";
import {
  EditRequest,
  LoginRequest,
  ResponsePayload,
  SignupRequest,
} from "@/models/user-model";
import { JWTDecoded } from "@/types/jwtTpyes";
import { setCookie } from "@/utils/cookies";
import { prismaClient } from "@/utils/database";
import { JWT } from "@/utils/jwt";
import bcrypt from "bcryptjs";

export class UserService {
  static async Signup(data: SignupRequest): Promise<ResponsePayload> {
    const totalEmailUSer = await prismaClient.user.count({
      where: {
        email: data.email,
      },
    });

    if (totalEmailUSer > 0)
      throw new ResponseError(403, "Email already registered");

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        ...data,

        password: hashPassword,
      },
    });

    const token = JWT.signJwt({ id: newUser.id, email: newUser.email });
    setCookie("token", token);
    return {
      message: "Success signup",
      status: "success",
      statusCode: 200,
      data: token,
    };
  }

  static async Login(data: LoginRequest): Promise<ResponsePayload> {
    const user = await prismaClient.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new ResponseError(404, "Email is not registered");

    const isSame = await bcrypt.compare(data.password, user.password);

    if (!isSame) throw new ResponseError(403, "Password is wrong!");

    const token = JWT.signJwt({ id: user.id, email: user.email });
    setCookie("token", token);
    return {
      message: "Success Login",
      status: "success",
      statusCode: 200,
      data: token,
    };
  }

  static async getUser(token: string): Promise<ResponsePayload> {
    const data = JWT.decoded(token) as JWTDecoded;
    if (!data) throw new ResponseError(403, "Oops! Token is invalid");

    const user = await prismaClient.user.findUnique({ where: { id: data.id } });
    if (!user) throw new ResponseError(404, "Opps! User not found!");
    const { password, ...dataUser } = user;
    let totalPurchased: number;
    const purchased = await prismaClient.purchased.findMany({
      where: {
        idUser: dataUser.id,
      },
    });

    if (purchased.length === 0) {
      totalPurchased = 0;
    } else {
      totalPurchased = purchased.reduce((sum, item) => sum + item.balance, 0);
    }

    console.log(totalPurchased);

    const favorited = await prismaClient.favorite.count({
      where: {
        idUser: dataUser.id,
      },
    });

    return {
      message: "Success get one user",
      status: "success",
      statusCode: 201,
      data: {
        ...dataUser,
        totalPurchased,
        favorited,
      },
    };
  }

  static async editUser(
    token: string,
    url: URL,
    data?: EditRequest
  ): Promise<ResponsePayload> {
    const decoded = JWT.decoded(token) as JWTDecoded;
    if (!decoded) throw new ResponseError(403, "Forbidden!! Unknown user");
    const address = url.searchParams.get("address");
    const dataUser = await prismaClient.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!dataUser) throw new ResponseError(404, "User is not found!");
    if (address) {
      await prismaClient.user.update({
        where: {
          id: dataUser.id,
        },
        data: {
          address,
        },
      });
    }

    if (data) {
      console.log("Ok");

      await prismaClient.user.update({
        where: {
          id: dataUser.id,
        },
        data,
      });
    }

    return {
      status: "success",
      statusCode: 201,
      message: "Successfully edited one user!",
    };
  }
}
