import { ProductRepository } from '@/domain/contracts/repositories/product'
import { UseCase } from './use-case'

export class LoadProductsUseCase implements UseCase<void, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    await this.productRepository.loadData()
  }
}