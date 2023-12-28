import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { CreateMovieTheaterUseCase } from "../../../useCases/CreateMovieTheaterUseCase";
import { CreateMovieTheaterController } from "../CreateMovieTheaterController";

export function makeCreateMovieTheaterController(): CreateMovieTheaterController {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const createMovieTheaterUseCase = new CreateMovieTheaterUseCase(movieTheatersRepository)

  const createMovieTheaterController = new CreateMovieTheaterController(createMovieTheaterUseCase)
  
  return createMovieTheaterController
}