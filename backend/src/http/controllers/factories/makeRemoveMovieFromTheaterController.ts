import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { RemoveMovieFromTheaterUseCase } from "../../../useCases/RemoveMovieFromTheaterUseCase";
import { RemoveMovieFromTheaterController } from "../RemoveMovieFromTheaterController";

export function makeRemoveMovieFromTheaterController(): RemoveMovieFromTheaterController {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const removeMovieFromTheaterUseCase = new RemoveMovieFromTheaterUseCase(movieTheatersRepository)

  const removeMovieFromTheaterController = new RemoveMovieFromTheaterController(removeMovieFromTheaterUseCase)

  return removeMovieFromTheaterController
}