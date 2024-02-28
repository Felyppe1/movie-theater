import { ROLE } from "@prisma/client";
import { User, UserGeneral } from "../../@Types/User";
import { IUsersRepository, UserCreateDTO, UserFindByEmailDTO, UserFindByIdDTO } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []
  
  async create(data: UserCreateDTO): Promise<User> {
    const user = {
      ...data,
      id: 'abcdef',
      role: ROLE.NORMAL,
      created_at: new Date(),
      cellphone_id: 'acbdef'
    }

    this.items.push(user)

    return user
  }

  async findByEmail(data: UserFindByEmailDTO): Promise<UserGeneral | null> {
    const user = this.items.find(user => user.email === data.email)

    if (!user) return null

    const userGeneral = {
      ...user,
      state: {
        id: 'abcdef',
        name: 'Rio de Janeiro'
      },
      city: {
        id: 'abcdef',
        name: 'Niterói',
        state_id: 'abcdef'
      },
      cellphone: {
        id: 'abcdef',
        ddd: '21',
        number: '988887777'
      }
    }

    return userGeneral
  }

  async findById(data: UserFindByIdDTO): Promise<UserGeneral | null> {
    const user = this.items.find(user => user.id === data.id)

    if (!user) return null

    const userGeneral = {
      ...user,
      state: {
        id: 'abcdef',
        name: 'Rio de Janeiro'
      },
      city: {
        id: 'abcdef',
        name: 'Niterói',
        state_id: 'abcdef'
      },
      cellphone: {
        id: 'abcdef',
        ddd: '21',
        number: '988887777'
      }
    }

    return userGeneral
  }

}