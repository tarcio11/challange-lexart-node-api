import { UserModel } from "./models/user.model";
import { User } from "../../../../domain/entities/user";
import { UserRepository } from "../../../../domain/contracts/repositories/user";

export class SequelizeUserRepository implements UserRepository {
  constructor(private categoryModel: typeof UserModel) {}

  async create (user: User): Promise<void> {
    const data = user.toJSON()
    await this.categoryModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async checkByEmail (email: string): Promise<boolean> {
    const user = await this.categoryModel.findOne({ where: { email } });
    return user !== null;
  }

  async getByEmail (email: string): Promise<User | null> {
    const user = await this.categoryModel.findOne({ where: { email } });
    return user ? new User(user.toJSON()) : null;
  }
}