import { MockProxy, mock } from 'jest-mock-extended'
import { Product } from '../../../src/domain/entities/product'
import { ProductRepository } from '../../../src/domain/contracts/repositories/product'
import { GetProductUseCase, Input } from '../../../src/domain/use-cases/get-product.use-case'

describe('UseCase: GetProduct', () => {
  let sut: GetProductUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input
  let createdAt: Date
  let updatedAt: Date

  beforeAll(() => {
    input = { id: 'any_id' }
    createdAt = new Date()
    updatedAt = new Date()
    productRepository = mock()
    productRepository.getOne.mockResolvedValue(new Product({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt,
      updatedAt
    }))
   })

  beforeEach(() => {
    sut = new GetProductUseCase(productRepository)
  })

  it('should call ProductRepository.getOne with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.getOne).toHaveBeenCalledWith(input.id)
    expect(productRepository.getOne).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductRepository.getOne throws', async () => {
    productRepository.getOne.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })

  it('should return product data on success', async () => {
    const product = await sut.execute(input)

    expect(product).toEqual({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt,
      updatedAt
    })
  })
})