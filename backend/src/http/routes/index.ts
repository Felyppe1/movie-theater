import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { placesRoutes } from "./places.routes";
import { movieTheatersRoutes } from "./movieTheaters.routes";
import { technologiesRoutes } from "./technologies.routes";
import { roomsRoutes } from "./rooms.routes";
import { moviesRoutes } from "./movies.routes";
import { configurationsRoutes } from "./configurations.routes";

export const router = Router()

router.use('/users', usersRoutes)
router.use('/places', placesRoutes)
router.use('/movie-theaters', movieTheatersRoutes)
router.use('/technologies', technologiesRoutes)
router.use('/rooms', roomsRoutes)
router.use('/movies', moviesRoutes)
router.use('/configurations', configurationsRoutes)