import { User } from "../../entities/user";

export interface UserRepository {
  create: (product: User) => Promise<void>
  checkByEmail: (email: string) => Promise<boolean>
}