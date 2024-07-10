import { CreateUserUseCase } from '../../domain/use-cases/create-user.use.case'
import { Controller } from '../../application/controllers/controller'
import { CreateUserController } from '../../application/controllers/create-user.controller'
import { UserModel } from '../../infra/database/repositories/sequelize/models/user.model'
import { SequelizeUserRepository } from '../../infra/database/repositories/sequelize/user.repository'
import { BcryptHandler } from '../../infra/gateways/bcrypt-handler'
import { CreateSessionUserAuthenticationUseCase } from '../../domain/use-cases/create-session-user-authentication.use-case'
import { JwtHandler } from '../../infra/gateways/jwt-handler'
import { CreateSessionUserAuthenticationController } from '../../application/controllers/create-session-user-authentication.controller'

export class UserControllerFactory {
  static makeCreateUserController (): Controller {
    const makeUserSequelizeRepository = new SequelizeUserRepository(UserModel)
    const makeBcryptHandler = new BcryptHandler()
    const makeUserUseCase = new CreateUserUseCase(makeUserSequelizeRepository, makeBcryptHandler)
    return new CreateUserController(makeUserUseCase)
  }

  static makeCreateSessionUserController (): Controller {
    const makeUserSequelizeRepository = new SequelizeUserRepository(UserModel)
    const makeBcryptHandler = new BcryptHandler()
    const makeJwtHandler = new JwtHandler()
    const makeUserUseCase = new CreateSessionUserAuthenticationUseCase(makeUserSequelizeRepository, makeBcryptHandler, makeJwtHandler)
    return new CreateSessionUserAuthenticationController(makeUserUseCase)
  }
}
