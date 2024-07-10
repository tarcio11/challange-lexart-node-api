import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { Input } from "../../domain/use-cases/create-user.use.case"
import { created, HttpResponse, serverError } from "../helpers/http";

type HttpRequest = Input
type Model = void

export class CreateUserController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async execute(input: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.useCase.execute(input)
      return created()
    } catch (error) {
      return serverError()
    }
  }
}
