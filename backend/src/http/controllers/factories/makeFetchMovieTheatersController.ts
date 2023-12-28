import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { FetchMovieTheatersUseCase } from "../../../useCases/FetchMovieTheatersUseCase";
import { FetchMovieTheatersController } from "../FetchMovieTheatersController";

export function makeFetchMovieTheatersController(): FetchMovieTheatersController {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const fetchMovieTheatersUseCase = new FetchMovieTheatersUseCase(movieTheatersRepository)

  const fetchMovieTheatersController = new FetchMovieTheatersController(fetchMovieTheatersUseCase)

  return fetchMovieTheatersController
}