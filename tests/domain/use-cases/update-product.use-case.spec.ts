import { mock, MockProxy } from 'jest-mock-extended'
import { Product } from '@/domain/entities/product'
import { ProductRepository } from '@/domain/contracts/repositories/product'
import { Input, UpdateProductUseCase } from '@/domain/use-cases/update-product.use-case'

describe('UseCase: UpdateProduct', () => {
  let sut: UpdateProductUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input
  let product: Product

  beforeAll(() => {
    input = { id: 'any_id', name: 'new_name', price: 20, stock: 20 }
    product = new Product({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    productRepository = mock()
    productRepository.getOne.mockResolvedValue(product)
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

  it('should call Product.save with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.save).toHaveBeenCalledWith(product)
    expect(productRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if Product.save throws', async () => {
    productRepository.save.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })
})