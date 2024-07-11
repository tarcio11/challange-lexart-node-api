import { JwtHandler } from '../../infra/gateways/jwt-handler'
import { AuthenticationMiddleware } from '../../application/middlewares/authentication'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = new JwtHandler()
  return new AuthenticationMiddleware(jwt.validate.bind(jwt))
}
