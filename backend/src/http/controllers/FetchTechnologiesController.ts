import { Request, Response } from "express";
import { FetchTechnologiesUseCase } from "../../useCases/FetchTechnologiesUseCase";

export class FetchTechnologiesController {
  private fetchTechnologiesUseCase: FetchTechnologiesUseCase

  constructor(fetchTechnologiesUseCase: FetchTechnologiesUseCase) {
    this.fetchTechnologiesUseCase = fetchTechnologiesUseCase
  }

  async handle(request: Request, response: Response) {
    const technologies = await this.fetchTechnologiesUseCase.execute()

    return response.status(200).json(technologies)
  }
}