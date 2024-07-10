import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "@/domain/use-cases/use-case";
import { GetProductController } from "@/application/controllers/get-product.controller";
import { serverError } from "@/application/helpers/http";
import { ProductFakeBuilder } from "@/tests/domain/fakes/product-fake.builder";
import { Input, Output } from "@/domain/use-cases/get-product.use-case";
import { ProductModel } from "@/domain/entities/product";

describe('Controllers: GetProductController', () => {
  let sut: GetProductController
  let useCase: MockProxy<UseCase<Input, Output>>
  let product: ProductModel

  beforeAll(() => {
    product = ProductFakeBuilder.aProduct().build().toJSON()
    useCase = mock()
    useCase.execute.mockResolvedValue(product)
  })

  beforeEach(() => {
    sut = new GetProductController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ id: 'any_id' })

    expect(useCase.execute).toHaveBeenCalledWith({ id: 'any_id' })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const response = await sut.execute({ id: 'any_id' })

    expect(response).toEqual({ statusCode: 200, data: product })
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ id: 'any_id' })

    expect(response).toEqual(serverError())
  })
})