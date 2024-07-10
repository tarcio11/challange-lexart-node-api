import { adaptExpressRoute } from '../adapters/express-router'
import { UserControllerFactory } from '../factory/user-controller.factory'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/signUp', adaptExpressRoute(UserControllerFactory.makeCreateUserController()))
  router.post('/api/signIn', adaptExpressRoute(UserControllerFactory.makeCreateSessionUserController()))
}
