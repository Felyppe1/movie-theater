import { Router } from "express";
import { makeCreateMovieTheaterController } from "../controllers/factories/makeCreateMovieTheaterController";
import { makeFetchMovieTheatersController } from "../controllers/factories/makeFetchMovieTheatersController";
import { makeGetMovieTheaterController } from "../controllers/factories/makeGetMovieTheaterController";
import { makeAddMovieToTheaterController } from "../controllers/factories/makeAddMovieToTheaterController";
import { makeRemoveMovieFromTheaterController } from "../controllers/factories/makeRemoveMovieFromTheaterController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', ensureAuthenticated, (request, response) => {
  return makeCreateMovieTheaterController().handle(request, response)
})

movieTheatersRoutes.get('/', (request, response) => {
  return makeFetchMovieTheatersController().handle(request, response)
})

movieTheatersRoutes.get('/:id', (request, response) => {
  return makeGetMovieTheaterController().handle(request, response)
})

movieTheatersRoutes.post('/:id/movie', ensureAuthenticated, (request, response) => {
  return makeAddMovieToTheaterController().handle(request, response)
})

movieTheatersRoutes.delete('/:id/movie/:movieId', ensureAuthenticated, (request, response) => {
  return makeRemoveMovieFromTheaterController().handle(request, response)
})