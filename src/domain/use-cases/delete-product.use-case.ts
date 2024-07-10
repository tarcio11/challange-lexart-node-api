import { ProductRepository } from '../../domain/contracts/repositories/product'
import { UseCase } from './use-case'

export type Input = { id: string }

export class DeleteProductUseCase implements UseCase<Input, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    await this.productRepository.delete(input.id)
  }
}