import {
  notFound,
} from './components/not-found'
import {
  serverError,
} from './components/server-error'
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  serverError,
  notFound,
}
