import { env } from "../../main/config/env";
import { TokenGenerator } from "../../domain/contracts/gateways/token";
import jwt from 'jsonwebtoken';

export class JwtHandler implements TokenGenerator {
  async generate (payload: any): Promise<string> {
    return jwt.sign(payload, env.jwtSecret);
  }
}