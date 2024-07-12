import { mock, MockProxy } from "jest-mock-extended";
import { UseCase } from "../../../src/domain/use-cases/use-case";
import { SearchProductsController } from "../../../src/application/controllers/search-products.controller";
import { serverError } from "../../../src/application/helpers/http";
import { ProductFakeBuilder } from "../../domain/fakes/product-fake.builder";
import { Input, Output } from "../../../src/domain/use-cases/search-products.use-case";
import { ProductModel } from "../../../src/domain/entities/product";

describe('Controllers: SearchProductsController', () => {
  let sut: SearchProductsController
  let useCase: MockProxy<UseCase<Input, Output>>
  let products: ProductModel[]

  beforeAll(() => {
    products = ProductFakeBuilder.theProducts(2).build().map(product => product.toJSON())
    useCase = mock()
    useCase.execute.mockResolvedValue({
      data: products,
      total: 2
    })
  })

  beforeEach(() => {
    sut = new SearchProductsController(useCase)
  })

  it('should call use case with correct input', async () => {
    await sut.execute({ page: 1, perPage: 10, name: 'any_name', id: 'any_id' })

    expect(useCase.execute).toHaveBeenCalledWith({ page: 1, perPage: 10, name: 'any_name', id: 'any_id', external: false })
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const response = await sut.execute({ page: 1, perPage: 10 })

    expect(response).toEqual({ statusCode: 200, data: {
      data: products,
      total: 2
    }})
  })

  it('should return 500 if use case throws', async () => {
    useCase.execute.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.execute({ page: 1, perPage: 10 })

    expect(response).toEqual(serverError())
  })
})