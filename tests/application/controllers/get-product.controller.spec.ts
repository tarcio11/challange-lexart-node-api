import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "../../../src/domain/use-cases/use-case";
import { GetProductController } from "../../../src/application/controllers/get-product.controller";
import { notFound, serverError } from "../../../src/application/helpers/http";
import { ProductFakeBuilder } from "../../../src/../tests/domain/fakes/product-fake.builder";
import { Input, Output } from "../../../src/domain/use-cases/get-product.use-case";
import { ProductModel } from "../../../src/domain/entities/product";
import { NotFoundError } from "../../../src/domain/errors/not-found-error";

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

  it('should return 404 if use case throws NotFoundError', async () => {
    const error = new NotFoundError('NotFoundError')
    useCase.execute.mockRejectedValueOnce(error)

    const response = await sut.execute({ id: 'any_id' })

    expect(response).toEqual(notFound(error))
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ id: 'any_id' })

    expect(response).toEqual(serverError())
  })
})