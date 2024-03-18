import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { DeleteMovieTheaterUseCase } from "../../../useCases/DeleteMovieTheaterUseCase";
import { DeleteMovieTheaterController } from "../DeleteMovieTheaterController";

export function makeDeleteMovieTheaterController() {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const deleteMovieTheaterUseCase = new DeleteMovieTheaterUseCase(movieTheatersRepository)

  const deleteMovieTheaterController = new DeleteMovieTheaterController(deleteMovieTheaterUseCase)

  return deleteMovieTheaterController
}