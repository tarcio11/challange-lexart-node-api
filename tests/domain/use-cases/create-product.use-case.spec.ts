import { MockProxy, mock } from 'jest-mock-extended'
import { mocked } from 'jest-mock'
import { Product } from "@/domain/entities/product"

interface ProductRepository {
  create: (product: Product) => Promise<void>
}

type Input = {
  name: string
  price: number
  stock: number
}

class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<void> {
    const instance = new Product(input)
    await this.productRepository.create(instance)
  }
}

jest.mock('@/domain/entities/product')

describe('UseCase: CreateProduct', () => {
  let sut: CreateProductUseCase
  let productRepository: MockProxy<ProductRepository>
  let input: Input

  beforeAll(() => {
    input = { name: 'any_name', price: 10, stock: 10 }
    productRepository = mock()
   })

  beforeEach(() => {
    sut = new CreateProductUseCase(productRepository)
  })

  it('should call ProductRepository.create with correct input', async () => {
    await sut.execute(input)

    expect(productRepository.create).toHaveBeenCalledWith(...mocked(Product).mock.instances)
    expect(productRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ProductRepository.create throws', async () => {
    productRepository.create.mockRejectedValueOnce(new Error('any_repository_error'))

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new Error('any_repository_error'))
  })
})