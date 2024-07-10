import { ProductRepository } from '@/domain/contracts/repositories/product'

export class LoadProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    await this.productRepository.loadData()
  }
}