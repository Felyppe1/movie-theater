import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository";
import { FetchMoviesUnrelatedToTheaterUseCase } from "../../../useCases/FetchMoviesUnrelatedToTheaterUseCase";
import { FetchMoviesUnrelatedToTheaterController } from "../FetchMoviesUnrelatedToTheaterController";

export function makeFetchMoviesUnrelatedToTheaterController(): FetchMoviesUnrelatedToTheaterController {
  const moviesRepository = new PrismaMoviesRepository()
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const fetchMoviesUnrelatedToTheaterUseCase = new FetchMoviesUnrelatedToTheaterUseCase(moviesRepository, movieTheatersRepository)

  const fetchMoviesUnrelatedToTheaterController = new FetchMoviesUnrelatedToTheaterController(
    fetchMoviesUnrelatedToTheaterUseCase
  )

  return fetchMoviesUnrelatedToTheaterController
}