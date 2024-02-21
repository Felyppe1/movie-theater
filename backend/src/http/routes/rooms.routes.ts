import { Router } from "express";
import { makeCreateRoomController } from "../controllers/factories/makeCreateRoomController";
import { makeGetRoomControoler } from "../controllers/factories/makeGetRoomController";
import { makeUpdateRoomController } from "../controllers/factories/makeUpdateRoomController";
import { makeDeleteRoomController } from "../controllers/factories/makeDeleteRoomController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ROLE } from "@prisma/client";
import { verifyUserAuthorization } from "../../middlewares/verifyUserAuthorization";

export const roomsRoutes = Router()

roomsRoutes.post('/',
  ensureAuthenticated, verifyUserAuthorization([ROLE.THEATER_ADMIN, ROLE.MOVIE_CURATOR, ROLE.ADMIN]), 
  (request, response) => {
    return makeCreateRoomController().handle(request, response)
  }
)

roomsRoutes.get('/:id', (request, response) => {
  return makeGetRoomControoler().handle(request, response)
})

roomsRoutes.put('/:id',
  ensureAuthenticated, verifyUserAuthorization([ROLE.THEATER_ADMIN, ROLE.MOVIE_CURATOR, ROLE.ADMIN]), 
  (request, response) => {
    return makeUpdateRoomController().handle(request, response)
  }
)

roomsRoutes.delete('/:id',
  ensureAuthenticated, verifyUserAuthorization([ROLE.THEATER_ADMIN, ROLE.MOVIE_CURATOR, ROLE.ADMIN]), 
  (request, response) => {
    return makeDeleteRoomController().handle(request, response)
  }
)