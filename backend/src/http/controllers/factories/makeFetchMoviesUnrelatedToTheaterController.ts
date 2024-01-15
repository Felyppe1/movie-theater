import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository";
import { FetchMoviesUnrelatedToTheaterUseCase } from "../../../useCases/FetchMoviesUnrelatedToTheaterUseCase";
import { FetchMoviesUnrelatedToTheaterController } from "../FetchMoviesUnrelatedToTheaterController";

export function makeFetchMoviesUnrelatedToTheaterController(): FetchMoviesUnrelatedToTheaterController {
  const moviesRepository = new PrismaMoviesRepository()

  const fetchMoviesUnrelatedToTheaterUseCase = new FetchMoviesUnrelatedToTheaterUseCase(moviesRepository)

  const fetchMoviesUnrelatedToTheaterController = new FetchMoviesUnrelatedToTheaterController(
    fetchMoviesUnrelatedToTheaterUseCase
  )

  return fetchMoviesUnrelatedToTheaterController
}