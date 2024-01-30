import { PrismaUserTokensRepository } from "../../../repositories/prisma/PrismaUserTokensRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository";
import { LoginUseCase } from "../../../useCases/LoginUseCase";
import { LoginController } from "../LoginController";

export function makeLoginController(): LoginController {
  const usersRepository = new PrismaUsersRepository()

  const userTokensRepository = new PrismaUserTokensRepository()

  const loginUseCase = new LoginUseCase(usersRepository, userTokensRepository)

  const loginController = new LoginController(loginUseCase)

  return loginController
}