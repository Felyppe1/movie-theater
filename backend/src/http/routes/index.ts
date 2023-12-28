import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { placesRoutes } from "./places.routes";
import { movieTheatersRoutes } from "./movieTheaters.routes";

export const router = Router()

router.use('/users', usersRoutes)
router.use('/places', placesRoutes)
router.use('/movie-theaters', movieTheatersRoutes)