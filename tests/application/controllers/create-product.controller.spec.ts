import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "@/domain/use-cases/use-case";
import { CreateProductController } from "@/application/controllers/create-product.controller";
import { serverError } from "@/application/helpers/http";

describe('Controllers: CreateProductController', () => {
  let sut: CreateProductController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
  })

  beforeEach(() => {
    sut = new CreateProductController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ name: 'valid_name', price: 10, stock: 10 })

    expect(useCase.execute).toHaveBeenCalledWith({ name: 'valid_name', price: 10, stock: 10 })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 201 on success', async () => {
    const response = await sut.execute({ name: 'valid_name', price: 10, stock: 10 })

    expect(response).toEqual({ statusCode: 201, data: null })
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ name: 'valid_name', price: 10, stock: 10 })

    expect(response).toEqual(serverError())
  })
})