import { Request, Response } from "express";
import { RemoveMovieFromTheaterUseCase } from "../../useCases/RemoveMovieFromTheaterUseCase";
import zod from 'zod'

const removeMovieFromTheaterParamsRequestValidationSchema = zod.object({
  id: zod.string().min(1)
})
type RemoveMovieFromTheaterParamsRequestDTO = zod.infer<typeof removeMovieFromTheaterParamsRequestValidationSchema>

const removeMovieFromTheaterBodyRequestValidationSchema = zod.object({
  movieId: zod.string().min(1)
})
type RemoveMovieFromTheaterBodyRequestDTO = zod.infer<typeof removeMovieFromTheaterBodyRequestValidationSchema>

export class RemoveMovieFromTheaterController {
  private removeMovieFromTheaterUseCase: RemoveMovieFromTheaterUseCase

  constructor(removeMovieFromTheaterUseCase: RemoveMovieFromTheaterUseCase) {
    this.removeMovieFromTheaterUseCase = removeMovieFromTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const params = request.params as RemoveMovieFromTheaterParamsRequestDTO
    const body = request.body as RemoveMovieFromTheaterBodyRequestDTO

    removeMovieFromTheaterParamsRequestValidationSchema.parse(params)
    removeMovieFromTheaterBodyRequestValidationSchema.parse(body)

    const movieTheater = await this.removeMovieFromTheaterUseCase.execute(params.id, body.movieId)

    return response.status(200).json(movieTheater)
  }
}