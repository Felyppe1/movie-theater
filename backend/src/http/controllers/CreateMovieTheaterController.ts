import { Request, Response } from "express";
import { CreateMovieTheaterUseCase } from "../../useCases/CreateMovieTheaterUseCase";
import zod from 'zod'

export const createMovieTheaterControllerBodySchema = zod.object({
  name: zod.string().min(1),
  street: zod.string().min(1),
  number: zod.string().min(1),
  state_id: zod.string().min(1),
  city_id: zod.string().min(1)
})


export class CreateMovieTheaterController {
  private createMovieTheaterUseCase: CreateMovieTheaterUseCase

  constructor(createMovieTheaterUseCase: CreateMovieTheaterUseCase) {
    this.createMovieTheaterUseCase = createMovieTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const body = createMovieTheaterControllerBodySchema.parse(request.body)

    const movieTheater = await this.createMovieTheaterUseCase.execute(body)

    return response.status(201).json(movieTheater)
  }
}