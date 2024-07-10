import { MockProxy, mock } from 'jest-mock-extended'
import { CreateUserUseCase, Input } from '../../../src/domain/use-cases/create-user.use.case'
import { UserRepository } from '../../../src/domain/contracts/repositories/user'
import { HasherGenerator } from '../../../src/domain/contracts/gateways/hash'
import { User } from '../../../src/domain/entities/user'

describe('UseCase: CreateUser', () => {
  let sut: CreateUserUseCase
  let userRepository: MockProxy<UserRepository>
  let hashGenerator: MockProxy<HasherGenerator>
  let input: Input
  let user: User

  beforeAll(() => {
    input = { name: 'any_name', email: 'any_email', password: 'any_password' }
    user = User.create(input)
    userRepository = mock()
    userRepository.checkByEmail.mockResolvedValue(false)
    hashGenerator = mock()
    hashGenerator.hash.mockResolvedValue('hashed_password')
   })

  beforeEach(() => {
    sut = new CreateUserUseCase(userRepository, hashGenerator)
  })

  it('should call UserRepository.checkByEmail with correct input', async () => {
    await sut.execute(input)

    expect(userRepository.checkByEmail).toHaveBeenCalledWith(input.email)
    expect(userRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw if UserRepository.checkByEmail returns true', async () => {
    userRepository.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('User already exists'))
  })

  it('should call HasherGenerator.hash with correct input', async () => {
    await sut.execute(input)

    expect(hashGenerator.hash).toHaveBeenCalledWith(input.password)
    expect(hashGenerator.hash).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if HasherGenerator.hash throws', async () => {
    hashGenerator.hash.mockRejectedValueOnce(new Error('any_hash_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_hash_error'))
  })

  it('should call UserRepository.create with correct input', async () => {
    await sut.execute(input)

    expect(userRepository.create).toHaveBeenCalledWith({
      ...user,
      password: 'hashed_password'
    })
    expect(userRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UserRepository.create throws', async () => {
    userRepository.create.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })
})