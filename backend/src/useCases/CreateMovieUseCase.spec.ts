import { expect, describe, it } from 'vitest'
import { InMemoryMoviesRepository } from '../repositories/inMemory/InMemoryMoviesRepository'
import { CreateMovieUseCase } from './CreateMovieUseCase'
import { AppError } from '../errors/AppError'

describe('Create movie use case', () => {
  it ('should be able to create a movie', async () => {
    const moviesRepository = new InMemoryMoviesRepository()
    const createMovieUseCase = new CreateMovieUseCase(moviesRepository)
    
    const movie = await createMovieUseCase.execute({
      tmdb_id: 123456,
      name: 'Teste',
      original_name: 'Test',
      synopsis: 'Sinopse teste',
      duration: 120,
      release_date: new Date(),
      poster_path: '/abcdefghijklmnop',
      max_date: new Date(),
      quantity_avaiable: 5,
      genres: [
        { id: 123456 }
      ]
    })

    expect(movie).toHaveProperty('id')
  })

  it('should not be able to create a movie with same tmdb id', async () => {
    const moviesRepository = new InMemoryMoviesRepository()
    const createMovieUseCase = new CreateMovieUseCase(moviesRepository)

    const tmdb_id = 123456

    await createMovieUseCase.execute({
      tmdb_id,
      name: 'Teste',
      original_name: 'Test',
      synopsis: 'Sinopse teste',
      duration: 120,
      release_date: new Date(),
      poster_path: '/abcdefghijklmnop',
      max_date: new Date(),
      quantity_avaiable: 5,
      genres: [
        { id: 123456 }
      ]
    })

    expect(() => 
      createMovieUseCase.execute({
        tmdb_id,
        name: 'Teste',
        original_name: 'Test',
        synopsis: 'Sinopse teste',
        duration: 120,
        release_date: new Date(),
        poster_path: '/abcdefghijklmnop',
        max_date: new Date(),
        quantity_avaiable: 5,
        genres: [
          { id: 123456 }
        ]
      })
    ).rejects.toBeInstanceOf(AppError)

  })
})