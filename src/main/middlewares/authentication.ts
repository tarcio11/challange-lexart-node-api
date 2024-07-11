import { adaptExpressMiddleware } from '../adapters/express-middleware'
import { makeAuthenticationMiddleware } from '../factory/authentication-middleware.factory'

export const auth = adaptExpressMiddleware(makeAuthenticationMiddleware())
