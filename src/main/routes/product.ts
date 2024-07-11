import { adaptExpressRoute } from '../../main/adapters/express-router'
import { ProductControllerFactory } from '../../main/factory/product-controller.factory'
import { auth } from '../middlewares/authentication'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/products', auth, adaptExpressRoute(ProductControllerFactory.makeCreateProductController()))
  router.post('/api/products/external', auth, adaptExpressRoute(ProductControllerFactory.makeCreateExternalProductController()))
  router.get('/api/products', auth, adaptExpressRoute(ProductControllerFactory.makeGetManyProductsController()))
  router.get('/api/products/search', auth, adaptExpressRoute(ProductControllerFactory.makeSearchProductsController()))
  router.get('/api/products/external', auth, adaptExpressRoute(ProductControllerFactory.makeGetExternalProductsController()))
  router.get('/api/products/:id', auth, adaptExpressRoute(ProductControllerFactory.makeGetProductController()))
  router.put('/api/products/:id', auth, adaptExpressRoute(ProductControllerFactory.makeUpdateProductController()))
  router.delete('/api/products/:id', auth, adaptExpressRoute(ProductControllerFactory.makeDeleteProductController()))
  router.delete('/api/products', auth, adaptExpressRoute(ProductControllerFactory.makeDeleteAllProductsController()))
  router.post('/api/products/load', auth, adaptExpressRoute(ProductControllerFactory.makeLoadProductsController()))
}
