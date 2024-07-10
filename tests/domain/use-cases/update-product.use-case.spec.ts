import { ProductRepository } from '@/domain/contracts/repositories/product'
import { mock, MockProxy } from 'jest-mock-extended'

export type Input = {
  id: string
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.getOne(input.id)
  }
}

describe('UseCase: UpdateProduct', () => {
  let sut: UpdateProductUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { id: 'any_id' }
    productRepository = mock()
  })

  beforeEach(() => {
    sut = new UpdateProductUseCase(productRepository)
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
})