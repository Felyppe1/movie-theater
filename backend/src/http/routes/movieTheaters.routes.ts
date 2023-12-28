import { Router } from "express";
import { makeCreateMovieTheaterController } from "../controllers/factories/makeCreateMovieTheaterController";
import { makeFetchMovieTheatersController } from "../controllers/factories/makeFetchMovieTheatersController";

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', (request, response) => {
  return makeCreateMovieTheaterController().handle(request, response)
})

movieTheatersRoutes.get('/', (request, response) => {
  return makeFetchMovieTheatersController().handle(request, response)
})