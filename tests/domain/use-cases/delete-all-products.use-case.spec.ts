import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'

export class DeleteAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    await this.productRepository.deleteAll()
  }
}

describe('UseCase: DeleteAllProducts', () => {
  let sut: DeleteAllProductsUseCase
  let productRepository: MockProxy<ProductRepository>

  beforeAll(() => {
    productRepository = mock()
  })

  beforeEach(() => {
    sut = new DeleteAllProductsUseCase(productRepository)
  })

  it('should call ProductRepository.deleteAll with correct input', async () => {
    await sut.execute()

    expect(productRepository.deleteAll).toHaveBeenCalledTimes(1)
  })
})