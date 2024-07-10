import { User } from "../../domain/entities/user"
import { UseCase } from "./use-case"
import { HasherGenerator } from "../contracts/gateways/hash"
import { UserRepository } from "../../domain/contracts/repositories/user"

export type Input = {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase implements UseCase<Input, void> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HasherGenerator
  ) {}

  async execute(input: Input): Promise<void> {
    const userExists = await this.userRepository.checkByEmail(input.email)
    if (userExists) throw new Error('User already exists')
    input.password = await this.hashGenerator.hash(input.password)
    const instance = User.create(input)
    await this.userRepository.create(instance)
  }
}
