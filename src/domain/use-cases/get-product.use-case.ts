import { ProductRepository } from '@/domain/contracts/repositories/product'

export type Input = { id: string }

export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const product = await this.productRepository.getOne(input.id)
    return product.toJSON()
  }
}