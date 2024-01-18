import { Request, Response } from "express";
import { RemoveMovieFromTheaterUseCase } from "../../useCases/RemoveMovieFromTheaterUseCase";


export class RemoveMovieFromTheaterController {
  private removeMovieFromTheaterUseCase: RemoveMovieFromTheaterUseCase

  constructor(removeMovieFromTheaterUseCase: RemoveMovieFromTheaterUseCase) {
    this.removeMovieFromTheaterUseCase = removeMovieFromTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const { id, movieId } = request.params

    const movieTheater = await this.removeMovieFromTheaterUseCase.execute({ id, movieId })

    return response.status(200).json(movieTheater)
  }
}