import { Controller } from '@/application/controllers/controller'
import { CreateProductController } from '@/application/controllers/create-product.controller'
import { DeleteAllProductsController } from '@/application/controllers/delete-all-products.controller'
import { DeleteProductController } from '@/application/controllers/delete-product.controller'
import { GetManyProductsController } from '@/application/controllers/get-many-products.controller'
import { GetProductController } from '@/application/controllers/get-product.controller'
import { LoadProductsController } from '@/application/controllers/load-products.controller'
import { SearchProductsController } from '@/application/controllers/search-products.controller'
import { UpdateProductController } from '@/application/controllers/update-product.controller'
import { CreateProductUseCase } from '@/domain/use-cases/create-product.use-case'
import { DeleteAllProductsUseCase } from '@/domain/use-cases/delete-all-products.use-case'
import { DeleteProductUseCase } from '@/domain/use-cases/delete-product.use-case'
import { GetManyProductsUseCase } from '@/domain/use-cases/get-many-products.use-case'
import { GetProductUseCase } from '@/domain/use-cases/get-product.use-case'
import { LoadProductsUseCase } from '@/domain/use-cases/load-products.use-case'
import { SearchProductsUseCase } from '@/domain/use-cases/search-products.use-case'
import { UpdateProductUseCase } from '@/domain/use-cases/update-product.use-case'
import { ProductModel } from '@/infra/database/repositories/sequelize/models/product.model'
import { SequelizeProductRepository } from '@/infra/database/repositories/sequelize/product.repository'

export class ProductControllerFactory {
  static makeCreateProductController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new CreateProductUseCase(makeProductSequelizeRepository)
    return new CreateProductController(makeProductUseCase)
  }

  static makeGetManyProductsController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new GetManyProductsUseCase(makeProductSequelizeRepository)
    return new GetManyProductsController(makeProductUseCase)
  }

  static makeGetProductController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new GetProductUseCase(makeProductSequelizeRepository)
    return new GetProductController(makeProductUseCase)
  }

  static makeUpdateProductController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new UpdateProductUseCase(makeProductSequelizeRepository)
    return new UpdateProductController(makeProductUseCase)
  }

  static makeDeleteProductController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new DeleteProductUseCase(makeProductSequelizeRepository)
    return new DeleteProductController(makeProductUseCase)
  }

  static makeDeleteAllProductsController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new DeleteAllProductsUseCase(makeProductSequelizeRepository)
    return new DeleteAllProductsController(makeProductUseCase)
  }

  static makeLoadProductsController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new LoadProductsUseCase(makeProductSequelizeRepository)
    return new LoadProductsController(makeProductUseCase)
  }

  static makeSearchProductsController (): Controller {
    const makeProductSequelizeRepository = new SequelizeProductRepository(ProductModel)
    const makeProductUseCase = new SearchProductsUseCase(makeProductSequelizeRepository)
    return new SearchProductsController(makeProductUseCase)
  }
}
