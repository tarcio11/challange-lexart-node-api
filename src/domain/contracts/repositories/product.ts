import { Product } from "../../../domain/entities/product";

export interface ProductRepository {
  create: (product: Product) => Promise<void>
  getOne: (id: string) => Promise<Product>
  getMany: (options: { perPage: number, page: number }) => Promise<{ data: Product[], total: number }>
  save: (product: Product) => Promise<void>
  delete: (id: string) => Promise<void>
  loadData: () => Promise<void>
  deleteAll: () => Promise<void>
  search: (options: { perPage: number, page: number, id?: string, name?: string }) => Promise<{ data: Product[], total: number }>
}