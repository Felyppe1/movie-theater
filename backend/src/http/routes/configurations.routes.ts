import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "../../middlewares/verifyUserAuthorization";
import { ROLE } from "@prisma/client";
import { makeGetConfigurationController } from "../controllers/factories/makeGetConfigurationController";
import { makeUpdateConfigurationController } from "../controllers/factories/makeUpdateConfigurationController";

export const configurationsRoutes = Router()

configurationsRoutes.get('/', (request, response) => {
  return makeGetConfigurationController().handle(request, response)
})

configurationsRoutes.put('/',
  ensureAuthenticated, verifyUserAuthorization([ROLE.ADMIN]),
  (request, response) => {
    return makeUpdateConfigurationController().handle(request, response)
  }
)