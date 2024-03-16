import { Request, Response } from "express";
import { GetConfigurationUseCase } from "../../useCases/GetConfigurationUseCase";

export class GetConfigurationController {
  private getConfigurationUseCase: GetConfigurationUseCase

  constructor(getConfigurationUseCase: GetConfigurationUseCase) {
    this.getConfigurationUseCase = getConfigurationUseCase
  }

  async handle(request: Request, response: Response) {
    const configuration = await this.getConfigurationUseCase.execute()
    
    return response.json(configuration)
  }
}