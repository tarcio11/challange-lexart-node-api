import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { Input, Output } from "../../domain/use-cases/create-session-user-authentication.use-case"
import { created, HttpResponse, ok, serverError } from "../helpers/http";

type HttpRequest = Input
type Model = Output

export class CreateSessionUserAuthenticationController implements Controller {
  constructor(private readonly useCase: UseCase<Input, Output>) {}

  async execute(input: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const httpResponse = await this.useCase.execute(input)
      return ok(httpResponse)
    } catch (error) {
      return serverError()
    }
  }
}
