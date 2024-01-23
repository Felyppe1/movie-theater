import { AppError } from "../errors/AppError";
import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

type FetchMoviesUnrelatedToTheaterUseCaseDTO = {
  movieTheaterId: string
}

export class FetchMoviesUnrelatedToTheaterUseCase {
  private moviesRepository: IMoviesRepository
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(moviesRepository: IMoviesRepository, movieTheatersRepository: IMovieTheatersRepository) {
    this.moviesRepository = moviesRepository
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute({ movieTheaterId }: FetchMoviesUnrelatedToTheaterUseCaseDTO) {
    const movieTheaterExists = await this.movieTheatersRepository.findById({ id: movieTheaterId })
    if (!movieTheaterExists) {
      throw new AppError('Cinema não encontrado', 404)
    }
    
    const movie = await this.moviesRepository.findManyUnrelatedToTheater({ movieTheaterId })
    
    return movie
  } 
}