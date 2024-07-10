import { ProductRepository } from '@/domain/contracts/repositories/product'
import { mock, MockProxy } from 'jest-mock-extended'

export type Input = { perPage: number, page: number }

export class GetManyProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.getMany(input)
  }
}

describe('UseCase: GetManyProducts', () => {
  let sut: GetManyProductsUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { perPage: 10, page: 1 }
    productRepository = mock()
  })

  beforeEach(() => {
    sut = new GetManyProductsUseCase(productRepository)
  })

  it('should call ProductRepository.getMany with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.getMany).toHaveBeenCalledWith(input)
    expect(productRepository.getMany).toHaveBeenCalledTimes(1)
  })
})