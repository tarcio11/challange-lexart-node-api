import { Product } from "@/domain/entities/product";

export interface ProductRepository {
  create: (product: Product) => Promise<void>
}