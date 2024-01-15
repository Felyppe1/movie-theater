import { Router } from "express";
import { makeCreateMovieController } from "../controllers/factories/makeCreateMovieController";
import { makeFetchMovieTmdbIdsController } from "../controllers/factories/makeFetchMovieTmdbIdsController";
import { makeFetchMoviesController } from "../controllers/factories/makeFetchMoviesController";
import { makeDeleteMovieController } from "../controllers/factories/makeDeleteMovieController";
import { makeFetchMoviesUnrelatedToTheaterController } from "../controllers/factories/makeFetchMoviesUnrelatedToTheaterController";

export const moviesRoutes = Router()

moviesRoutes.post('/', (request, response) => {
  return makeCreateMovieController().handle(request, response)
})

moviesRoutes.get('/tmdb-ids', (request, response) => {
  return makeFetchMovieTmdbIdsController().handle(request, response)
})

moviesRoutes.get('/', (request, response) => {
  return makeFetchMoviesController().handle(request, response)
})

moviesRoutes.get('/movie-theater/:id/unrelated', (request, response) => {
  return makeFetchMoviesUnrelatedToTheaterController().handle(request, response)
})

moviesRoutes.delete('/:id', (request, response) => {
  return makeDeleteMovieController().handle(request, response)
})