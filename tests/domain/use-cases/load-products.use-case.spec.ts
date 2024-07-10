import { mock, MockProxy } from 'jest-mock-extended'
import { ProductRepository } from '../../../src/domain/contracts/repositories/product'
import { LoadProductsUseCase } from '../../../src/domain/use-cases/load-products.use-case'

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

  it('should rethrow if ProductRepository.loadData throws', async () => {
    productRepository.loadData.mockRejectedValueOnce(new Error('Repository error'))

    const promise = sut.execute()

    await expect(promise).rejects.toThrow(new Error('Repository error'))
  })
})