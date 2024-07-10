import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'
import { Product } from '@/domain/entities/product'

type Input = { perPage: number, page: number, id?: string, name?: string }

export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const result = await this.productRepository.search(input)
    return {
      data: result.data.map(product => product.toJSON()),
      total: result.total
    }
  }
}

describe('UseCase: SearchProducts', () => {
  let sut: SearchProductsUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input
  let product: Product

  beforeAll(() => {
    input = { perPage: 10, page: 1, id: 'any_id', name: 'any_name' }
    product = new Product({
      name: 'any_name',
      price: 10,
      stock: 1,
      createdAt: new Date(),
      id: 'any_id',
      updatedAt: new Date()
    })
    productRepository = mock()
    productRepository.search.mockResolvedValue({ data: [], total: 0 })
  })

  beforeEach(() => {
    sut = new SearchProductsUseCase(productRepository)
  })

  it('should call ProductRepository.search with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.search).toHaveBeenCalledWith(input)
    expect(productRepository.search).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductRepository.search throws', async () => {
    productRepository.search.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })

  it('should return correctly on success', async () => {

    const result = await sut.execute(input)

    expect(result).toEqual({ data: [], total: 0 })
  })

  it('should return correctly on success with result', async () => {
    productRepository.search.mockResolvedValueOnce({ data: [product], total: 1 })

    const result = await sut.execute(input)

    expect(result).toEqual({ data: [product], total: 1 })
  })
})