import { UseCase } from './use-case'
import { ProductRepository } from '@/domain/contracts/repositories/product'
import { ProductModel } from '@/domain/entities/product'

export type Input = { id: string }
export type Output = ProductModel

export class GetProductUseCase implements UseCase<Input, Output>{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.getOne(input.id)
    return product.toJSON()
  }
}