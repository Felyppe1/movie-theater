import { compare } from "bcrypt";
import { AppError } from "../errors/AppError";
import { loginControllerBodyScheme } from "../http/controllers/LoginController";
import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import zod from 'zod'
import { sign } from "jsonwebtoken";
import { env } from "../env";

type LoginUseCaseDTO = zod.infer<typeof loginControllerBodyScheme>

export class LoginUseCase {
  private usersRepository: IUsersRepository
  private userTokensRepository: IUserTokensRepository

  constructor(
    usersRepository: IUsersRepository,
    userTokensRepository: IUserTokensRepository
  ) {
    this.usersRepository = usersRepository
    this.userTokensRepository = userTokensRepository
  }

  async execute({ email, password }: LoginUseCaseDTO) {
    const normalized_email = email.toLowerCase()

    const user = await this.usersRepository.findByEmail({ email: normalized_email })
    if (!user) {
      throw new AppError('Email ou senha incorretos', 404)
    }

    const passwordsMatch = await compare(password, user.password)
    if (!passwordsMatch) {
      throw new AppError('Email ou senha incorretos', 404)
    }

    const token = sign(
      {},
      env.SECRET_TOKEN,
      {
        subject: user.id,
        expiresIn: env.TOKEN_EXPIRES_IN
      }    
    )

    const refresh_token = sign(
      {},
      env.SECRET_REFRESH_TOKEN,
      {
        subject: user.id,
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
      }
    )
    
    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 30)

    await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: expiresDate,
      refresh_token
    })

    const tokenReturn = {
      user: {
        email: user.email,
        role: user.role
      },
      token,
      refresh_token
    }

    return tokenReturn
  }
}