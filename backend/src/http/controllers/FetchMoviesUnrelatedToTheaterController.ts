import { Request, Response } from "express";
import { FetchMoviesUnrelatedToTheaterUseCase } from "../../useCases/FetchMoviesUnrelatedToTheaterUseCase";
import zod from 'zod'

export const fetchMoviesUnrelatedToTheaterControllerParamsSchema = zod.object({
  id: zod.string().min(1)
})


export class FetchMoviesUnrelatedToTheaterController {
  private fetchMoviesUnrelatedToTheaterUseCase: FetchMoviesUnrelatedToTheaterUseCase

  constructor(fetchMoviesUnrelatedToTheaterUseCase: FetchMoviesUnrelatedToTheaterUseCase) {
    this.fetchMoviesUnrelatedToTheaterUseCase = fetchMoviesUnrelatedToTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const params = fetchMoviesUnrelatedToTheaterControllerParamsSchema.parse(request.params)

    const movies = await this.fetchMoviesUnrelatedToTheaterUseCase.execute(params.id)

    return response.status(200).json(movies)
  }
}