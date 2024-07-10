import { Controller } from '../../application/controllers/controller'
import { Request, RequestHandler, Response } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req: Request, res: Response) => {
  const httpResponse = await controller.execute({ ...req.body, ...req.params, ...req.query})
  const json = [200, 204, 201].includes(httpResponse.statusCode) ? httpResponse : { statusCode: httpResponse.statusCode, error: httpResponse.data.message }
  res.status(httpResponse.statusCode).json(json)
}
