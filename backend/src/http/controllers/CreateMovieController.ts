import { Request, Response } from "express";
import { CreateMovieUseCase } from "../../useCases/CreateMovieUseCase";
import zod from 'zod'

type ICreateMovieControllerDTO = {
  tmdb_id: number
  name: string
  original_name: string
  synopsis: string
  duration: number
  release_date: Date
  poster_path: string
  max_date: Date
  directors: string
}
const createMovieRequestValidationSchema = zod.object({
  tmdb_id: zod.number().min(1),
  name: zod.string().min(1),
  original_name: zod.string().min(1),
  synopsis: zod.string().min(1),
  duration: zod.number().min(1),
  release_date: zod.date(),
  poster_path: zod.string().min(1),
  max_date: zod.date(),
  directors: zod.string().optional()
})
export type ICreateMovieRequestDTO = zod.infer<typeof createMovieRequestValidationSchema>

export class CreateMovieController {
  private createMovieUseCase: CreateMovieUseCase

  constructor(createMovieUseCase: CreateMovieUseCase) {
    this.createMovieUseCase = createMovieUseCase
  }

  async handle(request: Request, response: Response) {
    const data = request.body as ICreateMovieRequestDTO

    data.max_date = new Date(data.max_date)
    data.release_date = new Date(data.release_date)
    createMovieRequestValidationSchema.parse(data)

    await this.createMovieUseCase.execute(data)

    return response.status(201).json({ message: 'Filme criado com sucesso' })
  }
}