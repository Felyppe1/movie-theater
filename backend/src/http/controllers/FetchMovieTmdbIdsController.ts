import { Request, Response } from "express";
import { FetchMovieTmdbIdsUseCase } from "../../useCases/FetchMovieTmdbIdsUseCase";

export class FetchMovieTmdbIdsController {
  private fetchMovieTmdbIdsUseCase: FetchMovieTmdbIdsUseCase

  constructor(fetchMovieTmdbIdsUseCase: FetchMovieTmdbIdsUseCase) {
    this.fetchMovieTmdbIdsUseCase = fetchMovieTmdbIdsUseCase
  }

  async handle(request: Request, response: Response) {
    const movieTmdbIds = await this.fetchMovieTmdbIdsUseCase.execute()

    return response.status(200).json(movieTmdbIds)
  }
}