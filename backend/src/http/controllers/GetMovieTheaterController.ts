import { Request, Response } from "express";
import { GetMovieTheaterUseCase } from "../../useCases/GetMovieTheaterUseCase";

export class GetMovieTheaterController {
  private getMovieTheaterUseCase: GetMovieTheaterUseCase

  constructor(getMovieTheaterUseCase: GetMovieTheaterUseCase) {
    this.getMovieTheaterUseCase = getMovieTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const movieTheater = await this.getMovieTheaterUseCase.execute({ id })

    return response.status(200).json(movieTheater)
  }
}