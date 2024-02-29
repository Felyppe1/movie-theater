import { Cellphone } from "./Cellphone"
import { City, State } from "./Place"

type ROLE = 'NORMAL' | 'THEATER_ADMIN' | 'MOVIE_CURATOR' | 'ADMIN'

type SEX = 'M' | 'F'

export type User = {
  id: string
  email: string
  password: string
  full_name: string
  social_name: string | null
  cpf: string
  sex: SEX
  date_of_birth: Date
  role: ROLE
  created_at: Date
  cellphone_id: string
  city_id: string
  state_id: string
}

export type UserGeneral = User & {
  state: State,
  city: City,
  cellphone: Cellphone
}

export type RefreshToken = {
  new_token: string
  new_refresh_token: string
}

export type RefreshTokenAdditional = RefreshToken & {
  user: Pick<User, 'id' | 'email' | 'role'>
}