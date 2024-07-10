import { ProductRepository } from '@/domain/contracts/repositories/product'
import { UseCase } from './use-case'

export class DeleteAllProductsUseCase implements UseCase<void, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    await this.productRepository.deleteAll()
  }
}