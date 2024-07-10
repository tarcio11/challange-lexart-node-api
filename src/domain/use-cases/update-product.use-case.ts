import { UseCase } from './use-case'
import { ProductRepository } from '@/domain/contracts/repositories/product'

export type Input = {
  id: string
  name?: string
  price?: number
  stock?: number
}

export class UpdateProductUseCase implements UseCase<Input, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<void> {
    const product = await this.productRepository.getOne(input.id)
    product.update(input)
    await this.productRepository.save(product)
  }
}