import { Request, Response } from "express";
import { FetchMoviesUseCase } from "../../useCases/FetchMoviesUseCase";
import zod from 'zod'

export const fetchMoviesControllerQuerySchema = zod.object({
  released: zod.enum(['true', 'false']).optional()
})

export class FetchMoviesController {
  private fetchMoviesUseCase: FetchMoviesUseCase

  constructor(fetchMoviesUseCase: FetchMoviesUseCase) {
    this.fetchMoviesUseCase = fetchMoviesUseCase
  }

  async handle(request: Request, response: Response) {
    const queryParams = fetchMoviesControllerQuerySchema.parse(request.query)

    const movies = await this.fetchMoviesUseCase.execute(queryParams)

    return response.status(200).json(movies)
  }
}