import { Request, Response } from "express";
import { FetchMovieTheatersUseCase } from "../../useCases/FetchMovieTheatersUseCase";

export class FetchMovieTheatersController {
  private fetchMovieTheatersUseCase: FetchMovieTheatersUseCase

  constructor(fetchMovieTheaterUseCase: FetchMovieTheatersUseCase) {
    this.fetchMovieTheatersUseCase = fetchMovieTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const movieTheaters = await this.fetchMovieTheatersUseCase.execute()

    return response.status(200).json(movieTheaters)
  }
}