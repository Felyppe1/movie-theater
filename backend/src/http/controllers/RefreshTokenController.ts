import { Request, Response } from "express"
import zod from 'zod'
import { RefreshTokenUseCase } from "../../useCases/RefreshTokenUseCase"

export const refreshTokenControllerBodyScheme = zod.object({
  refresh_token: zod.string().min(1)
})

export class RefreshTokenController {
  private refreshTokenUseCase: RefreshTokenUseCase

  constructor(refreshTokenUseCase: RefreshTokenUseCase) {
    this.refreshTokenUseCase = refreshTokenUseCase
  }

  async handle(request: Request, response: Response) {
    const body = refreshTokenControllerBodyScheme.parse(request.body)

    const tokens = await this.refreshTokenUseCase.execute(body)

    return response.status(200).json(tokens)
  }
}