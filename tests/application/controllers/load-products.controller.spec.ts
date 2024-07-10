import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "@/domain/use-cases/use-case";
import { LoadProductsController } from "@/application/controllers/load-products.controller";
import { serverError } from "@/application/helpers/http";

describe('Controllers: LoadProductsController', () => {
  let sut: LoadProductsController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
  })

  beforeEach(() => {
    sut = new LoadProductsController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute()

    expect(useCase.execute).toHaveBeenCalledWith()
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const response = await sut.execute()

    expect(response).toEqual({ statusCode: 204, data: null })
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute()

    expect(response).toEqual(serverError())
  })
})