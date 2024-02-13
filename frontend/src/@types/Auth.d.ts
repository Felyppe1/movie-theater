enum ROLE {
  NORMAL = 'NORMAL',
  THEATER_ADMIN = 'THEATER_ADMIN',
  MOVIE_CURATOR = 'MOVIE_CURATOR',
  ADMIN = 'ADMIN'
}

enum SEX {
  M = 'M',
  F = 'F'
}

type User = {
  id: string
  email: string
  password: string
  full_name: string
  social_name?: string
  cpf: string
  sex: SEX
  date_of_birth: Date
  role: ROLE
  created_at: Date

  cellphone_id: string
  city_id: string
  state_id: string
}

export type RefreshToken = {
  new_token: string
  new_refresh_token: string
}