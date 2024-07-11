import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { HttpResponse, notFound, ok, serverError } from "../helpers/http";
import { Input, Output } from "../../domain/use-cases/get-product.use-case";
import { NotFoundError } from "../../domain/errors/not-found-error";

type HttpRequest = Input
type Model = Output

export class GetProductController implements Controller {
  constructor(private readonly useCase: UseCase<Input, Model>) {}

  async execute(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const httpResponse = await this.useCase.execute(httpRequest)
      return ok(httpResponse)
    } catch (error) {
      if (error instanceof NotFoundError) return notFound(error)
      return serverError()
    }
  }
}
