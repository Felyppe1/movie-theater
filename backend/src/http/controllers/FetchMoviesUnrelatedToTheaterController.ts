import { Request, Response } from "express";
import { FetchMoviesUnrelatedToTheaterUseCase } from "../../useCases/FetchMoviesUnrelatedToTheaterUseCase";
import zod from 'zod'

const fetchMoviesUnrelatedToTheaterParamsRequestValidationSchema = zod.object({
  id: zod.string().min(1)
})
type fetchMoviesUnrelatedToTheaterParamsRequestDTO = zod.infer<
  typeof fetchMoviesUnrelatedToTheaterParamsRequestValidationSchema
>

export class FetchMoviesUnrelatedToTheaterController {
  private fetchMoviesUnrelatedToTheaterUseCase: FetchMoviesUnrelatedToTheaterUseCase

  constructor(fetchMoviesUnrelatedToTheaterUseCase: FetchMoviesUnrelatedToTheaterUseCase) {
    this.fetchMoviesUnrelatedToTheaterUseCase = fetchMoviesUnrelatedToTheaterUseCase
  }

  async handle(request: Request, response: Response) {
    const params = request.params as fetchMoviesUnrelatedToTheaterParamsRequestDTO

    fetchMoviesUnrelatedToTheaterParamsRequestValidationSchema.parse(params)

    const movies = await this.fetchMoviesUnrelatedToTheaterUseCase.execute(params.id)

    return response.status(200).json(movies)
  }
}