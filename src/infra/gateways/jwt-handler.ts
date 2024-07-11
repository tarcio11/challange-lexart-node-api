import { env } from "../../main/config/env";
import { TokenGenerator } from "../../domain/contracts/gateways/token";
import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtHandler implements TokenGenerator {
  async generate (payload: any): Promise<string> {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: '30min'
    });
  }

  async validate ({ token }: { token: string }): Promise<string> {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    return payload.id;
  }
}