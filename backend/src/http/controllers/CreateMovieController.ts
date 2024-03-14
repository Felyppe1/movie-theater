import { Request, Response } from "express";
import { CreateMovieUseCase } from "../../useCases/CreateMovieUseCase";
import zod from 'zod'

const genresValidationSchema = zod.object({
  id: zod.number().min(1)
})

export const createMovieControllerBodySchema = zod.object({
  tmdb_id: zod.number().min(1),
  name: zod.string().min(1),
  original_name: zod.string().min(1),
  synopsis: zod.string().min(1),
  genres: zod.array(genresValidationSchema),
  duration: zod.number(),
  release_date: zod.coerce.date(),
  poster_path: zod.string().min(1),
  max_date: zod.coerce.date(),
  directors: zod.string().optional(),
  quantity_avaiable: zod.number().min(1)
})

export class CreateMovieController {
  private createMovieUseCase: CreateMovieUseCase

  constructor(createMovieUseCase: CreateMovieUseCase) {
    this.createMovieUseCase = createMovieUseCase
  }

  async handle(request: Request, response: Response) {
    const body = createMovieControllerBodySchema.parse(request.body)

    const movie = await this.createMovieUseCase.execute(body)

    return response.status(201).json(movie)
  }
}