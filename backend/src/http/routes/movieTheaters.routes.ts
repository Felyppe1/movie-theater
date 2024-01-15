import { Router } from "express";
import { makeCreateMovieTheaterController } from "../controllers/factories/makeCreateMovieTheaterController";
import { makeFetchMovieTheatersController } from "../controllers/factories/makeFetchMovieTheatersController";
import { makeGetMovieTheaterController } from "../controllers/factories/makeGetMovieTheaterController";
import { makeAddMovieToTheaterController } from "../controllers/factories/makeAddMovieToTheaterController";

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', (request, response) => {
  return makeCreateMovieTheaterController().handle(request, response)
})

movieTheatersRoutes.get('/', (request, response) => {
  return makeFetchMovieTheatersController().handle(request, response)
})

movieTheatersRoutes.get('/:id', (request, response) => {
  return makeGetMovieTheaterController().handle(request, response)
})

movieTheatersRoutes.post('/:id/movie', (request, response) => {
  return makeAddMovieToTheaterController().handle(request, response)
})