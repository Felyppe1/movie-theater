import { fetchMoviesControllerQuerySchema } from "../http/controllers/FetchMoviesController";
import { IMoviesRepository } from "../repositories/IMoviesRepository";
import zod from 'zod'

type FetchMoviesUseCaseDTO = zod.infer<typeof fetchMoviesControllerQuerySchema>

export class FetchMoviesUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute({ released }: FetchMoviesUseCaseDTO) {
    const movies = await this.moviesRepository.getAll()
    
    if (released) {
      if (released === 'true') {
        return movies?.filter(movie => new Date(movie.release_date) <= new Date())
      }

      if (released === 'false') {
        return movies?.filter(movie => new Date(movie.release_date) > new Date())
      }
    }

    return movies
  }
}