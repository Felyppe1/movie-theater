import { SEX, User } from "@prisma/client"

type Cellphone = {
  ddd: string
  number: string
}

export type UserCreateDTO = {
  email: string
  password: string
  full_name: string
  social_name?: string
  cpf: string
  sex: SEX
  date_of_birth: Date
  cellphone_id: string
  city_id: string
  state_id: string
}

export type UserFindByEmailDTO = Pick<UserCreateDTO, 'email'>

export type UserFindByIdDTO = {
  id: string
}

export interface IUsersRepository {
  create(data: UserCreateDTO): Promise<User>
  findByEmail(data: UserFindByEmailDTO): Promise<User | null>
  findById(data: UserFindByIdDTO): Promise<User | null>
}