import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "@/domain/use-cases/use-case";
import { DeleteAllProductsController } from "@/application/controllers/delete-all-products.controller";
import { serverError } from "@/application/helpers/http";

describe('Controllers: DeleteAllProductsController', () => {
  let sut: DeleteAllProductsController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
  })

  beforeEach(() => {
    sut = new DeleteAllProductsController(useCase)
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