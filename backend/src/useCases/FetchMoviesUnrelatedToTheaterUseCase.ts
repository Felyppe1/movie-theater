import { fetchMoviesUnrelatedToTheaterControllerParamsSchema } from "../http/controllers/FetchMoviesUnrelatedToTheaterController";
import { IMoviesRepository } from "../repositories/IMoviesRepository";
import zod from 'zod'

type FetchMoviesUnrelatedToTheaterUseCaseDTO = zod.infer<
  typeof fetchMoviesUnrelatedToTheaterControllerParamsSchema
>

export class FetchMoviesUnrelatedToTheaterUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute({ movieTheaterId }: FetchMoviesUnrelatedToTheaterUseCaseDTO) {
    const movie = await this.moviesRepository.findManyUnrelatedToTheater({ movieTheaterId })
    
    return movie
  } 
}