import { Router } from "express";
import { makeFetchPlacesController } from "../controllers/factories/makeFetchPlacesController";

export const placesRoutes = Router()

placesRoutes.get('/', (request, response) => {
  makeFetchPlacesController().handle(request, response)
})