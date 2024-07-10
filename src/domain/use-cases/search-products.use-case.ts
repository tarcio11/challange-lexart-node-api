import { ProductRepository } from '@/domain/contracts/repositories/product'

export type Input = { perPage: number, page: number, id?: string, name?: string }

export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const result = await this.productRepository.search(input)
    return {
      data: result.data.map(product => product.toJSON()),
      total: result.total
    }
  }
}