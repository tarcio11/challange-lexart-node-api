import { serve, setup, serveFiles } from 'swagger-ui-express'
import { Express } from 'express'
import swaggerConfig from '../documentation'


export default (app: Express): void => {
  app.use('/api/docs', serve, setup(swaggerConfig))
}
