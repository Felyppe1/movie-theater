import { User, UserGeneral } from "../@Types/User"

export type UserCreateDTO = Omit<User, 'id' | 'role' | 'created_at'>

export type UserFindByEmailDTO = Pick<User, 'email'>

export type UserFindByIdDTO = Pick<User, 'id'>

export interface IUsersRepository {
  create(data: UserCreateDTO): Promise<User>
  findByEmail(data: UserFindByEmailDTO): Promise<UserGeneral | null>
  findById(data: UserFindByIdDTO): Promise<UserGeneral | null>
}