import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { HttpResponse, noContent, notFound, serverError } from "../../application/helpers/http";
import { Input } from "../../domain/use-cases/update-product.use-case";
import { NotFoundError } from "../../domain/errors/not-found-error";

type HttpRequest = Input
type Model = void

export class UpdateProductController implements Controller {
  constructor(private readonly useCase: UseCase<Input, Model>) {}

  async execute(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.useCase.execute(httpRequest)
      return noContent()
    } catch (error) {
      if (error instanceof NotFoundError) return notFound(error)
      return serverError()
    }
  }
}
