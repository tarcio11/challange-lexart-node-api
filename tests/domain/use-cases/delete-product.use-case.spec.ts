import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'

interface Input { id: string }

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.delete(input.id)
  }
}

describe('UseCase: DeleteProduct', () => {
  let sut: DeleteProductUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { id: 'any_id' }
    productRepository = mock()
  })

  beforeEach(() => {
    sut = new DeleteProductUseCase(productRepository)
  })

  it('should call ProductRepository.delete with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.delete).toHaveBeenCalledWith(input.id)
    expect(productRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductRepository.delete throws', async () => {
    productRepository.delete.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })
})