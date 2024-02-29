import { sign, verify } from "jsonwebtoken"
import { IUserTokensRepository } from "../repositories/IUserTokensRepository"
import { env } from "../env"
import zod from 'zod'
import { refreshTokenControllerBodyScheme } from "../http/controllers/RefreshTokenController"
import { AppError } from "../errors/AppError"

type RefreshTokenUseCaseDTO = zod.infer<typeof refreshTokenControllerBodyScheme>

type IPayload = {
  sub: string
  email: string
}

export class RefreshTokenUseCase {
  private userTokensRepository: IUserTokensRepository

  constructor(userTokensRepository: IUserTokensRepository) {
    this.userTokensRepository = userTokensRepository
  }

  async execute({ refresh_token }: RefreshTokenUseCaseDTO) {
    let user_id: string
    try {
      const { sub } = verify(refresh_token, env.SECRET_REFRESH_TOKEN) as IPayload
      user_id = sub
    } catch(error) {
      throw new AppError('Refresh token inválido', 400)
    }

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken({ user_id, refresh_token })
    if (!userToken) {
      throw new AppError('Refresh token não encontrado', 404)
    }

    await this.userTokensRepository.deleteById({ id: userToken.id })

    const new_refresh_token = sign(
      {},
      env.SECRET_REFRESH_TOKEN,
      {
        subject: user_id,
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
      }  
    )

    const new_token = sign(
      {},
      env.SECRET_TOKEN,
      {
        subject: user_id,
        expiresIn: env.TOKEN_EXPIRES_IN
      }    
    )

    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 30)

    await this.userTokensRepository.create({
      user_id,
      expires_date: expiresDate,
      refresh_token: new_refresh_token
    })

    return {
      new_token,
      new_refresh_token,
      user: {
        id: userToken.user.id,
        email: userToken.user.email,
        role: userToken.user.role
      }
    }
  } 
}