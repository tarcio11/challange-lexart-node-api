import { ProductRepository } from '@/domain/contracts/repositories/product'

export type Input = { perPage: number, page: number }

export class GetManyProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const result = await this.productRepository.getMany(input)
    return {
      data: result.data.map(product => product.toJSON()),
      total: result.total
    }
  }
}