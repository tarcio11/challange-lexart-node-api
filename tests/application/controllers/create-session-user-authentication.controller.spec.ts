import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "../../../src/domain/use-cases/use-case";
import { CreateSessionUserAuthenticationController } from "../../../src/application/controllers/create-session-user-authentication.controller";
import { notFound, serverError } from "../../../src/application/helpers/http";
import { User } from "../../../src/domain/entities/user";
import { NotFoundError } from "./../../../src/domain/errors/not-found-error";

describe('Controllers: CreateSessionUserAuthenticationController', () => {
  let sut: CreateSessionUserAuthenticationController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
    useCase.execute.mockResolvedValue({
      user: User.create({ name: 'any_name', email: 'any_email', password: 'any_password' }),
      accessToken: 'any_token'
    })
  })

  beforeEach(() => {
    sut = new CreateSessionUserAuthenticationController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ email: 'valid_email', password: 'valid_password'})

    expect(useCase.execute).toHaveBeenCalledWith({ email: 'valid_email', password: 'valid_password' })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const response = await sut.execute({ email: 'valid_email', password: 'valid_password' })

    expect(response).toEqual({ statusCode: 200, data: {
      user: { name: 'any_name', email: 'any_email', password: 'any_password' },
      accessToken: 'any_token'
    }})
  })

  it('should return 404 if use case throws NotFoundError', async () => {
    const error = new NotFoundError('NotFoundError')
    useCase.execute.mockRejectedValueOnce(error)

    const response = await sut.execute({ email: 'valid_email', password: 'valid_password' })

    expect(response).toEqual(notFound(error))
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ email: 'valid_email', password: 'valid_password' })

    expect(response).toEqual(serverError())
  })
})