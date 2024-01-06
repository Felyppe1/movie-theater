import { Router } from "express";
import { makeCreateMovieController } from "../controllers/factories/makeCreateMovieController";

export const moviesRoutes = Router()

moviesRoutes.post('/', (request, response) => {
  return makeCreateMovieController().handle(request, response)
})