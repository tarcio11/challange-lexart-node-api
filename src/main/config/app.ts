import { setupMiddlewares } from '../../main/config/middlewares'
import { setupRoutes } from '../../main/config/routes'
import setupSwagger from '../../main/config/swagger'

import express from 'express'

export const app = express();
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
