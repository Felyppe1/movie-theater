import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { AddMovieToTheaterUseCase } from "../../../useCases/AddMovieToTheaterUseCase";
import { AddMovieToTheaterController } from "../AddMovieToTheaterController";

export function makeAddMovieToTheaterController(): AddMovieToTheaterController {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const addMovieToTheaterUseCase = new AddMovieToTheaterUseCase(movieTheatersRepository)

  const addMovieToTheaterController = new AddMovieToTheaterController(addMovieToTheaterUseCase)
  
  return addMovieToTheaterController
}