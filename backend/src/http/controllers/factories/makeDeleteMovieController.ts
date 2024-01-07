import { PrismaMoviesRepository } from "../../../repositories/prisma/PrismaMoviesRepository";
import { DeleteMovieUseCase } from "../../../useCases/DeleteMovieUseCase";
import { DeleteMovieController } from "../DeleteMovieController";

export function makeDeleteMovieController(): DeleteMovieController {
  const moviesRepository = new PrismaMoviesRepository()

  const deleteMovieUseCase = new DeleteMovieUseCase(moviesRepository)

  const deleteMovieController = new DeleteMovieController(deleteMovieUseCase)
  
  return deleteMovieController
}