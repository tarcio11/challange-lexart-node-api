import { Product } from "@/domain/entities/product"
import { ProductRepository } from "@/domain/contracts/repositories/product"
import { UseCase } from "./use-case"

export type Input = {
  name: string
  price: number
  stock: number
}

export class CreateProductUseCase implements UseCase<Input, void> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<void> {
    const instance = new Product(input)
    await this.productRepository.create(instance)
  }
}
