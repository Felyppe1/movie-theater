import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository";
import { CreateMovieUseCase } from "../../../useCases/CreateMovieUseCase";
import { CreateMovieController } from "../CreateMovieController";

export function makeCreateMovieController(): CreateMovieController {
  const moviesRepository = new PrismaMoviesRepository()

  const createMovieUseCase = new CreateMovieUseCase(moviesRepository)

  const createMovieController = new CreateMovieController(createMovieUseCase)
  
  return createMovieController
}