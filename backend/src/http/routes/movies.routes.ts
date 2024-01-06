import { Router } from "express";
import { makeCreateMovieController } from "../controllers/factories/makeCreateMovieController";
import { makeFetchMovieTmdbIdsController } from "../controllers/factories/makeFetchMovieTmdbIdsController";
import { makeFetchMoviesController } from "../controllers/factories/makeFetchMoviesController";

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