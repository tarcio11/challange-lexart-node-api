import { UseCase } from './use-case'
import { ProductRepository } from '@/domain/contracts/repositories/product'
import { ProductModel } from '@/domain/entities/product'

export type Input = { perPage: number, page: number, id?: string, name?: string }
export type Output = { data: ProductModel[], total: number }

export class SearchProductsUseCase implements UseCase<Input, Output> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const result = await this.productRepository.search(input)
    return {
      data: result.data.map(product => product.toJSON()),
      total: result.total
    }
  }
}