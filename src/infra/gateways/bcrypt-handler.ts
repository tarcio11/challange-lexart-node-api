import { hash, compare } from 'bcrypt';
import { HasherGenerator } from "@/domain/contracts/gateways/hash"

export class BcryptHandler implements HasherGenerator {
  async hash(plaintext: string): Promise<string> {
    return hash(plaintext, 10)
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest)
  }
}