import { PrismaUserTokensRepository } from "../../../repositories/prisma/PrismaUserTokensRepository";
import { RefreshTokenUseCase } from "../../../useCases/RefreshTokenUseCase";
import { RefreshTokenController } from "../RefreshTokenController";

export function makeRefreshTokenController(): RefreshTokenController {
  const userTokensRepository = new PrismaUserTokensRepository()
  
  const refreshTokenUseCase = new RefreshTokenUseCase(userTokensRepository)

  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

  return refreshTokenController
}