import { PrismaUserTokensRepository } from "../../../repositories/prisma/PrismaUserTokensRepository";
import { LogoutUseCase } from "../../../useCases/LogoutUseCase";
import { LogoutController } from "../LogoutController";

export function makeLogoutController(): LogoutController {
  const userTokensRepository = new PrismaUserTokensRepository()

  const logoutUseCase = new LogoutUseCase(userTokensRepository)

  const logoutController = new LogoutController(logoutUseCase)

  return logoutController
}