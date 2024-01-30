import { verify } from "jsonwebtoken"
import { IUserTokensRepository } from "../repositories/IUserTokensRepository"
import { env } from "../env"
import { AppError } from "../errors/AppError"

type LogoutUseCaseDTO = {
  refresh_token: string
}

type IPayload = {
  email: string
  sub: string
}

export class LogoutUseCase {
  private userTokensRepository: IUserTokensRepository

  constructor(userTokensRepository: IUserTokensRepository) {
    this.userTokensRepository = userTokensRepository
  }

  async execute({ refresh_token }: LogoutUseCaseDTO) {
    const { email, sub: user_id } = verify(refresh_token, env.SECRET_REFRESH_TOKEN) as IPayload

    const refreshTokenExists = await this.userTokensRepository.findByUserIdAndRefreshToken({ user_id, refresh_token })
    if (!refreshTokenExists) {
      throw new AppError('Refresh token não encontrado', 404)
    }

    await this.userTokensRepository.deleteById({ id: refreshTokenExists.id })
  }
}