import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository";
import { AddMovieToTheaterUseCase } from "../../../useCases/AddMovieToTheaterUseCase";
import { AddMovieToTheaterController } from "../AddMovieToTheaterController";

export function makeAddMovieToTheaterController(): AddMovieToTheaterController {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()
  const moviesRepository = new PrismaMoviesRepository()

  const addMovieToTheaterUseCase = new AddMovieToTheaterUseCase(
    movieTheatersRepository,
    moviesRepository
  )

  const addMovieToTheaterController = new AddMovieToTheaterController(addMovieToTheaterUseCase)
  
  return addMovieToTheaterController
}