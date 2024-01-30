import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"
import { verify } from "jsonwebtoken"
import { PrismaUsersRepository } from "../repositories/prisma/PrismaUsersRepository"
import { env } from "../env"
import { ROLE } from "@prisma/client"

interface ExtendedRequest extends Request {
  user: {
    id: string
    role: ROLE
  }
}

type IPayload = {
  sub: string
}

export async function ensureAuthenticated(request: ExtendedRequest, response: Response, next: NextFunction) {
  const headerAuthorization = request.headers.authorization
  if (!headerAuthorization) {
    throw new AppError('Token faltando', 401)
  }

  const [, token] = headerAuthorization.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      env.SECRET_TOKEN
    ) as IPayload

    const usersRepository = new PrismaUsersRepository()
    
    const user = await usersRepository.findById({ id: user_id }) 
    if (!user) {
      throw new AppError('Usuário não existe', 404)
    }

    request.user = {
      id: user.id,
      role: user.role
    }

    next()

  } catch {
    throw new AppError('Token inválido', 401)
  }
}