import { Router } from "express";
import { makeCreateMovieTheaterController } from "../controllers/factories/makeCreateMovieTheaterController";

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', (request, response) => {
  return makeCreateMovieTheaterController().handle(request, response)
})