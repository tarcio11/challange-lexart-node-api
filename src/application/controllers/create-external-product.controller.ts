import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { Input } from "../../domain/use-cases/create-product.use-case";
import { created, HttpResponse, serverError } from "../helpers/http";

type HttpRequest = Input
type Model = void

export class CreateExternalProductController implements Controller {
  constructor(private readonly useCase: UseCase<Input, Model>) {}

  async execute(input: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.useCase.execute({
        name: input.name,
        price: input.price,
        stock: input.stock,
        isExternal: true
      })
      return created()
    } catch (error) {
      return serverError()
    }
  }
}
