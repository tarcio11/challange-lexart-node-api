import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "../../../src/domain/use-cases/use-case";
import { DeleteProductController } from "../../../src/application/controllers/delete-product.controller";
import { serverError } from "../../../src/application/helpers/http";

describe('Controllers: DeleteProductController', () => {
  let sut: DeleteProductController
  let useCase: MockProxy<UseCase>

  beforeAll(() => {
    useCase = mock()
  })

  beforeEach(() => {
    sut = new DeleteProductController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ id: 'any_id' })

    expect(useCase.execute).toHaveBeenCalledWith({ id: 'any_id' })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const response = await sut.execute({ id: 'any_id' })

    expect(response).toEqual({ statusCode: 204, data: null })
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ id: 'any_id' })

    expect(response).toEqual(serverError())
  })
})