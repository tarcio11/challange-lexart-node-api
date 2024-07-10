import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '@/domain/contracts/repositories/product'
import { DeleteAllProductsUseCase } from '@/domain/use-cases/delete-all-products.use-case'

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

  it('should rethrow if ProductRepository.deleteAll throws', async () => {
    productRepository.deleteAll.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute()

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })
})