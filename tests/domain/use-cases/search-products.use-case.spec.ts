import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'

type Input = { perPage: number, page: number, id?: string, name?: string }

export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.search(input)
  }
}

describe('UseCase: SearchProducts', () => {
  let sut: SearchProductsUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { perPage: 10, page: 1, id: 'any_id', name: 'any_name' }
    productRepository = mock()
  })

  beforeEach(() => {
    sut = new SearchProductsUseCase(productRepository)
  })

  it('should call ProductRepository.search with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.search).toHaveBeenCalledWith(input)
    expect(productRepository.search).toHaveBeenCalledTimes(1)
  })
})