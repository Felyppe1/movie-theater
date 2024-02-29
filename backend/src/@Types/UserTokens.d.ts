import { User } from "./User"

export type UserTokens = {
  id: string
  refresh_token: string
  expires_date: Date
  created_at: Date
  user_id: string
}

export type UserTokensFull = UserTokens & {
  user: User
}