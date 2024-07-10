import { ProductRepository } from '@/domain/contracts/repositories/product'
import { mock, MockProxy } from 'jest-mock-extended'
import { Product } from '@/domain/entities/product'

export type Input = { perPage: number, page: number }

export class GetManyProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const result = await this.productRepository.getMany(input)
    return {
      data: result.data.map(product => product.toJSON()),
      total: result.total
    }
  }
}

describe('UseCase: GetManyProducts', () => {
  let sut: GetManyProductsUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { perPage: 10, page: 1 }
    productRepository = mock()
    productRepository.getMany.mockResolvedValue({ data: [], total: 0 })
  })

  beforeEach(() => {
    sut = new GetManyProductsUseCase(productRepository)
  })

  it('should call ProductRepository.getMany with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.getMany).toHaveBeenCalledWith(input)
    expect(productRepository.getMany).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductRepository.getMany throws', async () => {
    productRepository.getMany.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })

  it('should return an empty array if ProductRepository.getMany returns an empty array', async () => {
    const result = await sut.execute(input)

    expect(result).toEqual({
      data: [],
      total: 0
    })
  })

  it('should return product data on success', async () => {
    const product = new Product({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    productRepository.getMany.mockResolvedValueOnce({ data: [product], total: 1 })

    const result = await sut.execute(input)

    expect(result).toEqual({
      data: [product],
      total: 1
    })
  })
})