import { Request, Response } from "express";
import { FetchPlacesUseCase } from "../../useCases/FetchPlacesUseCase";

export class FetchPlacesController {
  private fetchPlacesUseCase: FetchPlacesUseCase

  constructor(fetchPlacesUseCase: FetchPlacesUseCase) {
    this.fetchPlacesUseCase = fetchPlacesUseCase
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const states = await this.fetchPlacesUseCase.execute()

    return response.status(200).json(states)
  }
}