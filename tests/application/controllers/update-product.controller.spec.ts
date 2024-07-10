import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "../../../src/domain/use-cases/use-case";
import { UpdateProductController } from "../../../src/application/controllers/update-product.controller";
import { serverError } from "../../../src/application/helpers/http";

describe('Controllers: UpdateProductController', () => {
  let sut: UpdateProductController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
  })

  beforeEach(() => {
    sut = new UpdateProductController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ id: 'any_id', name: 'updated_name', price: 10, stock: 10 })

    expect(useCase.execute).toHaveBeenCalledWith({ id: 'any_id', name: 'updated_name', price: 10, stock: 10 })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const response = await sut.execute({ id: 'any_id', name: 'updated_name', price: 10, stock: 10 })

    expect(response).toEqual({ statusCode: 204, data: null })
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ id: 'any_id', name: 'updated_name', price: 10, stock: 10 })

    expect(response).toEqual(serverError())
  })
})