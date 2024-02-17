import { prisma } from "../../lib/prisma";
import { IUserTokensRepository, UserTokensCreateDTO, UserTokensDeleteByIdDTO, UserTokensFindByUserIdAndRefreshTokenDTO } from "../IUserTokensRepository";

export class PrismaUserTokensRepository implements IUserTokensRepository {
  async create(data: UserTokensCreateDTO) {
    const user = await prisma.userTokens.create({ data })

    return user
  }

  async findByUserIdAndRefreshToken({ user_id, refresh_token }: UserTokensFindByUserIdAndRefreshTokenDTO) {
    const user = await prisma.userTokens.findFirst({
      where: { user_id, refresh_token }
    })

    return user
  }

  async deleteById({ id }: UserTokensDeleteByIdDTO) {
    await prisma.userTokens.delete({ where: { id } })
  }

}