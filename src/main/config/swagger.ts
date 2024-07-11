import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import swaggerConfig from '../documentation'
import {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} from "swagger-ui-dist";

export default (app: Express): void => {
  app.use('/api/docs', serve, setup(swaggerConfig))
}
