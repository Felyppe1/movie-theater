import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository"
import { FetchMoviesUseCase } from "../../../useCases/FetchMoviesUseCase"
import { FetchMoviesController } from "../FetchMoviesController"

export function makeFetchMoviesController() {
  const moviesRepository = new PrismaMoviesRepository()

  const fetchMoviesUseCase = new FetchMoviesUseCase(moviesRepository)

  const fetchMoviesController = new FetchMoviesController(fetchMoviesUseCase)
  
  return fetchMoviesController
}