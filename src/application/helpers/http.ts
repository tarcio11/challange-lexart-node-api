import { InternalServerError, ForbiddenError } from "../../application/errors/http"

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const created = (): HttpResponse => ({
  statusCode: 201,
  data: null
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  data: new InternalServerError()
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  data: error
})

export const forbidden = (): HttpResponse => ({
  statusCode: 403,
  data: new ForbiddenError()
})