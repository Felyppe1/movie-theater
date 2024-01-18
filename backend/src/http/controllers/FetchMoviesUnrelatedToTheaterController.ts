import { Request, Response } from "express";
import { FetchMoviesUnrelatedToTheaterUseCase } from "../../useCases/FetchMoviesUnrelatedToTheaterUseCase";


export class FetchMoviesUnrelatedToTheaterController {
  private fetchMoviesUnrelatedToTheaterUseCase: FetchMoviesUnrelatedToTheaterUseCase

  constructor(fetchMoviesUnrelatedToTheaterUseCase: FetchMoviesUnrelatedToTheaterUseCase) {
    this.fetchMoviesUnrelatedToTheaterUseCase = fetchMoviesUnrelatedToTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const { id: movieTheaterId } = request.params

    const movies = await this.fetchMoviesUnrelatedToTheaterUseCase.execute({ movieTheaterId })

    return response.status(200).json(movies)
  }
}