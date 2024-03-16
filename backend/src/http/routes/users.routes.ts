import { Router, request } from "express";
import { makeCreateUserController } from "../controllers/factories/makeCreateUserController";
import { makeLoginController } from "../controllers/factories/makeLoginController";
import { makeLogoutController } from "../controllers/factories/makeLogoutController";
import { makeRefreshTokenController } from "../controllers/factories/makeRefreshTokenController";
// TODO: Factory vs Facade Pattern

export const usersRoutes = Router() 

usersRoutes.post('/', (request, response) => {
  return makeCreateUserController().handle(request, response)
})

usersRoutes.post('/login', (request, response) => {
  return makeLoginController().handle(request, response)
})

usersRoutes.post('/refresh-token', (request, response) => {
  return makeRefreshTokenController().handle(request, response)
})

usersRoutes.delete('/logout/:refresh_token', (request, response) => {
  return makeLogoutController().handle(request, response)
})