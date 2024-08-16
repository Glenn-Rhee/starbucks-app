import { JwtPayload } from "jsonwebtoken";

export interface JWTDecoded extends JwtPayload {
  id: string;
  email: string;
}
