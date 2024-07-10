import { ProductRepository } from '@/domain/contracts/repositories/product'

export type Input = {
  id: string
  name?: string
  price?: number
  stock?: number
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const product = await this.productRepository.getOne(input.id)
    product.update(input)
    await this.productRepository.save(product)
  }
}