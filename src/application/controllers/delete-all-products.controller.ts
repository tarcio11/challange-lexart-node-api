import { UseCase } from "../../domain/use-cases/use-case";
import { Controller } from "./controller";
import { HttpResponse, noContent, serverError } from "../helpers/http";

type Model = void

export class DeleteAllProductsController implements Controller {
  constructor(private readonly useCase: UseCase<void, void>) {}

  async execute(): Promise<HttpResponse<Model>> {
    try {
      await this.useCase.execute()
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
