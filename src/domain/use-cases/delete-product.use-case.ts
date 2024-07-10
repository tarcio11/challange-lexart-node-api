import { ProductRepository } from '@/domain/contracts/repositories/product'

export type Input = { id: string }

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.delete(input.id)
  }
}