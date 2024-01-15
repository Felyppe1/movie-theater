import { Request, Response } from "express";
import { AddMovieToTheaterUseCase } from "../../useCases/AddMovieToTheaterUseCase";
import zod from 'zod'

const addMovieToTheaterParamsRequestValidationSchema = zod.object({
  id: zod.string().min(1)
})
type AddMovieToTheaterParamsRequestDTO = zod.infer<typeof addMovieToTheaterParamsRequestValidationSchema>

const addMovieToTheaterBodyRequestValidationSchema = zod.object({
  movieId: zod.string().min(1)
})
type AddMovieToTheaterBodyRequestDTO = zod.infer<typeof addMovieToTheaterBodyRequestValidationSchema>


export class AddMovieToTheaterController {
  private addMovieToTheaterUseCase: AddMovieToTheaterUseCase

  constructor(addMovieToTheaterUseCase: AddMovieToTheaterUseCase) {
    this.addMovieToTheaterUseCase = addMovieToTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const params = request.params as AddMovieToTheaterParamsRequestDTO
    const body = request.body as AddMovieToTheaterBodyRequestDTO

    addMovieToTheaterParamsRequestValidationSchema.parse(params)
    addMovieToTheaterBodyRequestValidationSchema.parse(body)

    const movieTheater = await this.addMovieToTheaterUseCase.execute(params.id, body.movieId)

    return response.status(200).json(movieTheater)
  }
}