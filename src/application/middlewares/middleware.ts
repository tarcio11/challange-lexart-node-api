import { HttpResponse } from '../helpers/http'

export interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
