import { Request, Response } from "express";
import { AddMovieToTheaterUseCase } from "../../useCases/AddMovieToTheaterUseCase";
import zod from 'zod'

export const addMovieToTheaterControllerBodySchema = zod.object({
  movieId: zod.string().min(1)
})


export class AddMovieToTheaterController {
  private addMovieToTheaterUseCase: AddMovieToTheaterUseCase

  constructor(addMovieToTheaterUseCase: AddMovieToTheaterUseCase) {
    this.addMovieToTheaterUseCase = addMovieToTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { movieId } = addMovieToTheaterControllerBodySchema.parse(request.body)

    const movieTheater = await this.addMovieToTheaterUseCase.execute({ id, movieId })

    return response.status(200).json(movieTheater)
  }
}