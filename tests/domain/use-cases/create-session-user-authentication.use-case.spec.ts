import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "./use-case"
import { User, UserModel } from "../../../src/domain/entities/user"
import { UserRepository } from "../../../src/domain/contracts/repositories/user"
import { HasherGenerator } from "../../../src/domain/contracts/gateways/hash";
import { TokenGenerator } from "../../../src/domain/contracts/gateways/token";

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

describe('UseCase: CreateSessionUserAuthentication', () => {
  let sut: CreateSessionUserAuthenticationUseCase
  let userRepository: MockProxy<UserRepository>
  let hashGenerator: MockProxy<HasherGenerator>
  let tokenGenerator: MockProxy<TokenGenerator>

  beforeAll(() => {
    userRepository = mock()
    userRepository.getByEmail.mockResolvedValue(new User({ id: 'any_id', name: 'any_name', email: 'any_email', password: 'any_password' }))
    hashGenerator = mock()
    hashGenerator.compare.mockResolvedValue(true)
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_access_token')
  })

  beforeEach(() => {
    sut = new CreateSessionUserAuthenticationUseCase(userRepository, hashGenerator, tokenGenerator)
  })

  it('should call getByEmail with correct params', async () => {
    await sut.execute({ email: 'any_email', password: 'any_password' })

    expect(userRepository.getByEmail).toHaveBeenCalledWith('any_email')
    expect(userRepository.getByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw if getByEmail returns null', async () => {
    userRepository.getByEmail.mockResolvedValueOnce(null)

    await expect(sut.execute({ email: 'any_email', password: 'any_password' })).rejects.toThrow(new Error('User not found'))
  })

  it('should call compare with correct params', async () => {
    await sut.execute({ email: 'any_email', password: 'any_password' })

    expect(hashGenerator.compare).toHaveBeenCalledWith('any_password', 'any_password')
    expect(hashGenerator.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw if compare returns false', async () => {
    hashGenerator.compare.mockResolvedValueOnce(false)

    await expect(sut.execute({ email: 'any_email', password: 'any_password' })).rejects.toThrow(new Error('User not found'))
  })

  it('should call generate with correct params', async () => {
    await sut.execute({ email: 'any_email', password: 'any_password' })

    expect(tokenGenerator.generate).toHaveBeenCalledWith({ id: 'any_id' })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should return correct values', async () => {
    const result = await sut.execute({ email: 'any_email', password: 'any_password' })

    expect(result).toEqual({
      user: expect.objectContaining({ id: 'any_id', name: 'any_name', email: 'any_email', password: 'any_password' }),
      accessToken: 'any_access_token'
    })
  })
})
