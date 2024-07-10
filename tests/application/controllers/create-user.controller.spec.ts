import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "../../../src/domain/use-cases/use-case";
import { CreateUserController } from "../../../src/application/controllers/create-user.controller";
import { serverError } from "../../../src/application/helpers/http";

describe('Controllers: CreateUserController', () => {
  let sut: CreateUserController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
  })

  beforeEach(() => {
    sut = new CreateUserController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ name: 'valid_name', email: 'valid_email', password: 'valid_password'})

    expect(useCase.execute).toHaveBeenCalledWith({ name: 'valid_name', email: 'valid_email', password: 'valid_password' })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 201 on success', async () => {
    const response = await sut.execute({ name: 'valid_name', email: 'valid_email', password: 'valid_password' })

    expect(response).toEqual({ statusCode: 201, data: null })
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ name: 'valid_name', email: 'valid_email', password: 'valid_password' })

    expect(response).toEqual(serverError())
  })
})