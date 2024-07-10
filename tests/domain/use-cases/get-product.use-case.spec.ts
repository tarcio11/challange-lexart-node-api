import { MockProxy, mock } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'

type Input = { id: string }

class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.getOne(input.id)
  }
}

describe('UseCase: GetProduct', () => {
  let sut: GetProductUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { id: 'any_id' }
    productRepository = mock()
   })

  beforeEach(() => {
    sut = new GetProductUseCase(productRepository)
  })

  it('should call ProductRepository.getOne with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.getOne).toHaveBeenCalledWith(input.id)
    expect(productRepository.getOne).toHaveBeenCalledTimes(1)
  })
})