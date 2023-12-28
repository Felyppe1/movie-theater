import { PrismaMovieTheatersRepository } from "../../../repositories/prisma/PrismaMovieTheatersRepository";
import { GetMovieTheaterUseCase } from "../../../useCases/GetMovieTheaterUseCase";
import { GetMovieTheaterController } from "../GetMovieTheaterController";

export function makeGetMovieTheaterController(): GetMovieTheaterController {
  const movieTheatersRepository = new PrismaMovieTheatersRepository()

  const getMovieTheaterUseCase = new GetMovieTheaterUseCase(movieTheatersRepository)

  const getMovieTheaterController = new GetMovieTheaterController(getMovieTheaterUseCase)
  
  return getMovieTheaterController
}