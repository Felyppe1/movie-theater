import { Router } from "express";
import { makeCreateMovieController } from "../controllers/factories/makeCreateMovieController";
import { makeFetchMovieTmdbIdsController } from "../controllers/factories/makeFetchMovieTmdbIdsController";

export const moviesRoutes = Router()

moviesRoutes.post('/', (request, response) => {
  return makeCreateMovieController().handle(request, response)
})

moviesRoutes.get('/tmdb-ids', (request, response) => {
  return makeFetchMovieTmdbIdsController().handle(request, response)
})