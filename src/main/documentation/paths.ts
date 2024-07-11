import { getProductsPath } from './paths/get-products.path'
import { loginPath } from './paths/login.path'
import { productPath } from './paths/product.path'
import { signupPath } from './paths/signup.path'

export default {
  '/signUp': signupPath,
  '/signIn': loginPath,
  '/products': productPath,
  '/products/external': getProductsPath,
}
