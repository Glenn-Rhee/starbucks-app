import { ResponseError } from "@/error/error";
import {
  LoginRequest,
  ResponsePayload,
  SignupRequest,
} from "@/models/user-model";
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

    if (totalEmailUSer > 0) {
      throw new ResponseError(403, "Email already registered");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });

    const token = JWT.signJwt({ id: newUser.id, email: newUser.email });

    console.log("Berhasil menambahkan user baru: ", newUser);
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

    if (!user) {
      throw new ResponseError(404, "Email is not registered");
    }

    const isSame = await bcrypt.compare(data.password, user.password);

    if (!isSame) {
      throw new ResponseError(403, "Password is wrong!");
    }

    const token = JWT.signJwt({ id: user.id, email: user.email });

    return {
      message: "Success Login",
      status: "success",
      statusCode: 200,
      data: token,
    };
  }
}
