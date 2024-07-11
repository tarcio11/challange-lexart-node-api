import { adaptExpressRoute } from '../../main/adapters/express-router'
import { ProductControllerFactory } from '../../main/factory/product-controller.factory'
import { auth } from '../middlewares/authentication'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/products', auth, adaptExpressRoute(ProductControllerFactory.makeCreateProductController()))
  router.get('/api/products', auth, adaptExpressRoute(ProductControllerFactory.makeGetManyProductsController()))
  router.get('/api/products/search', adaptExpressRoute(ProductControllerFactory.makeSearchProductsController()))
  router.get('/api/products/external', adaptExpressRoute(ProductControllerFactory.makeGetExternalProductsController()))
  router.get('/api/products/:id', adaptExpressRoute(ProductControllerFactory.makeGetProductController()))
  router.put('/api/products/:id', adaptExpressRoute(ProductControllerFactory.makeUpdateProductController()))
  router.delete('/api/products/:id', adaptExpressRoute(ProductControllerFactory.makeDeleteProductController()))
  router.delete('/api/products', adaptExpressRoute(ProductControllerFactory.makeDeleteAllProductsController()))
  router.post('/api/products/load', adaptExpressRoute(ProductControllerFactory.makeLoadProductsController()))
}
