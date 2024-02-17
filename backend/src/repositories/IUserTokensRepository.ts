import { UserTokens } from "../@Types/UserTokens"

export type UserTokensCreateDTO = Omit<UserTokens, 'id' | 'created_at'>

export type UserTokensFindByUserIdAndRefreshTokenDTO = Pick<UserTokens, 'user_id' | 'refresh_token'>

export type UserTokensDeleteByIdDTO = Pick<UserTokens, 'id'>

export interface IUserTokensRepository {
  create(data: UserTokensCreateDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(data: UserTokensFindByUserIdAndRefreshTokenDTO): Promise<UserTokens | null>
  deleteById(data: UserTokensDeleteByIdDTO): Promise<void>
}