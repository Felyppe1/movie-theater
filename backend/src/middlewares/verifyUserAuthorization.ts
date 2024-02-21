import { NextFunction, Response } from "express"
import { AppError } from "../errors/AppError"
import { ExtendedRequest } from "./ensureAuthenticated"
import { ROLE } from "@prisma/client"


export function verifyUserAuthorization(allowedRoles: ROLE[]) {
  return (request: ExtendedRequest, response: Response, next: NextFunction) => {
    const { role } = request.user
    
    if (!allowedRoles.includes(role)) {
      throw new AppError('Proibido', 403)
    }

    return next()
  }
}