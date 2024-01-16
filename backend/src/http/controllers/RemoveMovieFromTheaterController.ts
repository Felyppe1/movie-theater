import { Request, Response } from "express";
import { RemoveMovieFromTheaterUseCase } from "../../useCases/RemoveMovieFromTheaterUseCase";
import zod from 'zod'

export const removeMovieFromTheaterRequestParamsSchema = zod.object({
  id: zod.string().min(1)
})

export const removeMovieFromTheaterRequestBodySchema = zod.object({
  movieId: zod.string().min(1)
})

export class RemoveMovieFromTheaterController {
  private removeMovieFromTheaterUseCase: RemoveMovieFromTheaterUseCase

  constructor(removeMovieFromTheaterUseCase: RemoveMovieFromTheaterUseCase) {
    this.removeMovieFromTheaterUseCase = removeMovieFromTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const { id } = removeMovieFromTheaterRequestParamsSchema.parse(request.params)
    const { movieId } = removeMovieFromTheaterRequestBodySchema.parse(request.body)

    const movieTheater = await this.removeMovieFromTheaterUseCase.execute({ id, movieId })

    return response.status(200).json(movieTheater)
  }
}