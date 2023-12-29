import { Router } from "express";
import { makeFetchTechnologiesController } from "../controllers/factories/makeFetchTechnologiesController";

export const technologiesRoutes = Router()

technologiesRoutes.get('/', (request, response) => {
  return makeFetchTechnologiesController().handle(request, response)
})