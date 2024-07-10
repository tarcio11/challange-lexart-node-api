import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { HttpResponse, noContent, serverError } from "../helpers/http";
import { Input } from "../../domain/use-cases/delete-product.use-case";

type HttpRequest = Input
type Model = void

export class DeleteProductController implements Controller {
  constructor(private readonly useCase: UseCase<Input, void>) {}

  async execute(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.useCase.execute(httpRequest)
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
