import { MovieGeneral, Movie } from "../../@Types/Movie";
import { IMoviesRepository, MovieCreateDTO, MovieFindByIdDTO, MovieFindByTmdbIdDTO, MovieFindManyUnrelatedToTheaterDTO } from "../IMoviesRepository";

export class InMemoryMoviesRepository implements IMoviesRepository {
  public items: Movie[] = []
  
  async create(data: MovieCreateDTO): Promise<MovieGeneral> {
    const movie = {
      ...data,
      id: 'movie-1',
      directors: null,
      genres: [
        {
          id: data.genres[0].id,
          name: 'Comédia'
        }
      ]
    }

    this.items.push(movie)

    return movie
  }
  
  async findByTmdbId(data: MovieFindByTmdbIdDTO): Promise<Movie | null> {
    const movie = this.items.find(movie => movie.tmdb_id === data.tmdbId)

    if (!movie) return null

    return movie
  }

  async findById(data: MovieFindByIdDTO): Promise<Movie | null> {
    const movie = this.items.find(movie => movie.id === data.id)

    if (!movie) return null

    return movie
  }

  async findManyUnrelatedToTheater(data: MovieFindManyUnrelatedToTheaterDTO): Promise<MovieGeneral[] | null> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<MovieGeneral[] | null> {
    throw new Error("Method not implemented.");
  }

  async delete(data: MovieFindByIdDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  

}