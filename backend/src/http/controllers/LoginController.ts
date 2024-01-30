import { Request, Response } from 'express'
import { LoginUseCase } from '../../useCases/LoginUseCase'
import zod from 'zod'

export const loginControllerBodyScheme = zod.object({
  email: zod.string().min(1),
  password: zod.string().min(1)
})

export class LoginController {
  private loginUseCase: LoginUseCase

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase
  }

  async handle(request: Request, response: Response) {
    const body = loginControllerBodyScheme.parse(request.body)

    const user = await this.loginUseCase.execute(body)

    return response.status(200).json(user)
  }
}