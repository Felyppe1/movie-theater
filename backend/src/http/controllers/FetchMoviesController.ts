import { Request, Response } from "express";
import { FetchMoviesUseCase } from "../../useCases/FetchMoviesUseCase";

export class FetchMoviesController {
  private fetchMoviesUseCase: FetchMoviesUseCase

  constructor(fetchMoviesUseCase: FetchMoviesUseCase) {
    this.fetchMoviesUseCase = fetchMoviesUseCase
  }

  async handle(request: Request, response: Response) {
    const movies = await this.fetchMoviesUseCase.execute()

    return response.status(200).json(movies)
  }
}