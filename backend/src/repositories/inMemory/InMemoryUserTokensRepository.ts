import { ROLE, SEX } from "@prisma/client";
import { UserTokens, UserTokensFull } from "../../@Types/UserTokens";
import { IUserTokensRepository, UserTokensCreateDTO, UserTokensDeleteByIdDTO, UserTokensFindByUserIdAndRefreshTokenDTO } from "../IUserTokensRepository";

export class InMemoryUserTokensRepository implements IUserTokensRepository {
  public items: UserTokens[] = []

  async create(data: UserTokensCreateDTO): Promise<UserTokens> {
    const userToken = {
      ...data,
      id: 'abcdef',
      created_at: new Date()
    }

    this.items.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(data: UserTokensFindByUserIdAndRefreshTokenDTO): Promise<UserTokensFull | null> {
    const userToken = this.items.find(item => item.user_id === data.user_id && item.refresh_token === data.refresh_token)

    if (!userToken) return null

    const userTokenFull = {
      ...userToken,
      user: {
        id: 'abcdef',
        role: ROLE.NORMAL,
        created_at: new Date(),
        cellphone_id: 'acbdef',
        email: "teste@gmail.com",
        password: "123456789",
        full_name: "Nome Teste",
        social_name: null,
        cpf: "11122233344",
        sex: SEX.M,
        date_of_birth: new Date(),
        state_id: "abcdef",
        city_id: "abcdef"
      }
    }
    
    return userTokenFull
  }

  async deleteById(data: UserTokensDeleteByIdDTO): Promise<void> {
    this.items = this.items.filter(item => item.id !== data.id)
  }
}