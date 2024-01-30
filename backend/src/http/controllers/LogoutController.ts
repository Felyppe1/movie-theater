import { Request, Response } from "express";
import { LogoutUseCase } from "../../useCases/LogoutUseCase";

export class LogoutController {
  private logoutUseCase: LogoutUseCase 

  constructor(logoutUseCase: LogoutUseCase) {
    this.logoutUseCase = logoutUseCase
  }

  async handle(request: Request, response: Response) {
    const { refresh_token } = request.params

    await this.logoutUseCase.execute({ refresh_token })

    return response.status(204).send()
  }
}