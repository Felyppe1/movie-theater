import { Request, Response } from "express";
import { CreateMovieTheaterUseCase } from "../../useCases/CreateMovieTheaterUseCase";

export class CreateMovieTheaterController {
  private createMovieTheaterUseCase: CreateMovieTheaterUseCase

  constructor(createMovieTheaterUseCase: CreateMovieTheaterUseCase) {
    this.createMovieTheaterUseCase = createMovieTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const data = request.body

    const movieTheater = await this.createMovieTheaterUseCase.execute(data)

    return response.status(201).json(movieTheater)
  }
}