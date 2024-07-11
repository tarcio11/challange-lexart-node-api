import { CreateProductParamsSchema } from './schemas/create-product-params.schema'
import { errorSchema } from './schemas/error.schema'
import { ListProductsSchema } from './schemas/list-produtcs.schema'
import { loginParamsSchema } from './schemas/login-params.schema'
import { NoContentSchema } from './schemas/no-content'
import { SignInSchema } from './schemas/signin.schema'
import { signupParamsSchema } from './schemas/signup-params.schema'

export default {
  loginParams: loginParamsSchema,
  signin: SignInSchema,
  error: errorSchema,
  noContent: NoContentSchema,
  createProductParams: CreateProductParamsSchema,
  listProducts: ListProductsSchema,
  signupParams: signupParamsSchema,
}
