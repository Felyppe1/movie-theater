import { UserTokens } from "@prisma/client"

export interface UserTokensCreateDTO {
  user_id: string
  expires_date: Date
  refresh_token: string
}

export type UserTokensFindByUserIdAndRefreshToken = {
  user_id: string
  refresh_token: string
}

export type UserTokensDeleteById = {
  id: string
}

export interface IUserTokensRepository {
  create(data: UserTokensCreateDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(data: UserTokensFindByUserIdAndRefreshToken): Promise<UserTokens | null>
  deleteById(data: UserTokensDeleteById): Promise<void>
}