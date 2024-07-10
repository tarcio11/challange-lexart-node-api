import { ProductRepository } from '@/domain/contracts/repositories/product'

export class DeleteAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    await this.productRepository.deleteAll()
  }
}