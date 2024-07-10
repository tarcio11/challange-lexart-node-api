import { Product } from "@/domain/entities/product";

export interface ProductRepository {
  create: (product: Product) => Promise<void>
  getOne: (id: string) => Promise<Product>
  getMany: (options: { perPage: number, page: number }) => Promise<{ data: Product[], total: number }>
}