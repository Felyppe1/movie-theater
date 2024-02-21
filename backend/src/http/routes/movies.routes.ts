import { Router } from "express";
import { makeCreateMovieController } from "../controllers/factories/makeCreateMovieController";
import { makeFetchMovieTmdbIdsController } from "../controllers/factories/makeFetchMovieTmdbIdsController";
import { makeFetchMoviesController } from "../controllers/factories/makeFetchMoviesController";
import { makeDeleteMovieController } from "../controllers/factories/makeDeleteMovieController";
import { makeFetchMoviesUnrelatedToTheaterController } from "../controllers/factories/makeFetchMoviesUnrelatedToTheaterController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "../../middlewares/verifyUserAuthorization";
import { ROLE } from "@prisma/client";

export const moviesRoutes = Router()

moviesRoutes.post('/',
  ensureAuthenticated, verifyUserAuthorization([ROLE.THEATER_ADMIN, ROLE.MOVIE_CURATOR, ROLE.ADMIN]),
  (request, response) => {
    return makeCreateMovieController().handle(request, response)
  }
)

moviesRoutes.get('/tmdb-ids', (request, response) => {
  return makeFetchMovieTmdbIdsController().handle(request, response)
})

moviesRoutes.get('/', (request, response) => {
  return makeFetchMoviesController().handle(request, response)
})

moviesRoutes.get('/movie-theater/:id/unrelated', (request, response) => {
  return makeFetchMoviesUnrelatedToTheaterController().handle(request, response)
})

moviesRoutes.delete('/:id',
  ensureAuthenticated, verifyUserAuthorization([ROLE.THEATER_ADMIN, ROLE.MOVIE_CURATOR, ROLE.ADMIN]),
  (request, response) => {
    return makeDeleteMovieController().handle(request, response)
  }
)