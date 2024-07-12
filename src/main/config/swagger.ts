import { serve, setup, serveFiles } from 'swagger-ui-express'
import { Express } from 'express'
import swaggerConfig from '../documentation'

const CSS_URL = ' https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ';

const options = {
  customCssUrl: CSS_URL,
};

export default (app: Express): void => {
  app.use('/api/docs', serve, serveFiles(swaggerConfig, options), setup(swaggerConfig, options))
}
