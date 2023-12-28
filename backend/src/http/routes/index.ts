import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { placesRoutes } from "./places.routes";

export const router = Router()

router.use('/users', usersRoutes)
router.use('/places', placesRoutes)