import { User, UserModel } from "../entities/user"
import { UserRepository } from "../contracts/repositories/user"
import { UseCase } from "./use-case"
import { HasherGenerator } from "../contracts/gateways/hash";
import { TokenGenerator } from "../contracts/gateways/token";

export type Input = { email: string; password: string }
export type Output = { user: UserModel, accessToken: string }

export class CreateSessionUserAuthenticationUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HasherGenerator,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email)
    if (!user) throw new Error('User not found')
    const isValidPassword = await this.hashGenerator.compare(input.password, user.toJSON().password)
    if (!isValidPassword) throw new Error('User not found')
    const accessToken = await this.tokenGenerator.generate({ id: user.toJSON().id })
    return {
      user: user.toJSON(),
      accessToken
    }
  }
}
