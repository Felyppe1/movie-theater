import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository"
import { FetchMovieTmdbIdsUseCase } from "../../../useCases/FetchMovieTmdbIdsUseCase"
import { FetchMovieTmdbIdsController } from "../FetchMovieTmdbIdsController"

export function makeFetchMovieTmdbIdsController(): FetchMovieTmdbIdsController {
  const moviesRepository = new PrismaMoviesRepository()

  const fetchMovieTmdbIdsUseCase = new FetchMovieTmdbIdsUseCase(moviesRepository)

  const fetchMovieTmdbIdsController = new FetchMovieTmdbIdsController(fetchMovieTmdbIdsUseCase)
  
  return fetchMovieTmdbIdsController
}