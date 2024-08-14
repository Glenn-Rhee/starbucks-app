import jwt from "jsonwebtoken";

export class JWT {
  static signJwt(data: { id: string; email: string }) {
    return jwt.sign(
      data,
      process.env.SECRET_KEY || "kasudgksjudgbkasydgfkvajsudbdfkavsdujhfg",
      {
        expiresIn: "1d",
      }
    );
  }

  static decoded(token: string) {
    return jwt.decode(token);
  }
}
