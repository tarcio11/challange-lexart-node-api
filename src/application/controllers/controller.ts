import { HttpResponse } from "../../application/helpers/http";

export interface Controller {
  execute: (request: any) => Promise<HttpResponse>
}