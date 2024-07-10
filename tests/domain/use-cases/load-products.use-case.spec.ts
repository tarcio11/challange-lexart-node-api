import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'

export class LoadProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    return await this.productRepository.loadData()
  }
}

describe('UseCase: LoadProducts', () => {
  let sut: LoadProductsUseCase
  let productRepository: MockProxy<ProductRepository>

  beforeAll(() => {
    productRepository = mock()
    productRepository.getMany.mockResolvedValue({ data: [], total: 0 })
  })

  beforeEach(() => {
    sut = new LoadProductsUseCase(productRepository)
  })

  it('should call ProductRepository.loadData with correctly', async () => {
    await sut.execute()

    expect(productRepository.loadData).toHaveBeenCalledTimes(1)
  })
})