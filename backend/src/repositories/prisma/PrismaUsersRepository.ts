import { IUsersRepository, UserCreateDTO, UserFindByEmailDTO, UserFindByIdDTO } from "../IUsersRepository";
import { prisma } from "../../lib/prisma";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: UserCreateDTO) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById({ id }: UserFindByIdDTO) {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        state: true,
        city: true,
        cellphone: true
      }
    })

    return user
  }

  async findByEmail({ email }: UserFindByEmailDTO) {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        state: true,
        city: true,
        cellphone: true
      }
    })
    
    return user
  }
}