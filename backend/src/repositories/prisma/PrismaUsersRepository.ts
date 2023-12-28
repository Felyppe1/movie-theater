import { IUsersRepository } from "../IUsersRepository";
import { prisma } from "../../lib/prisma";
import { Prisma, User } from "@prisma/client";

export class PrismaUsersRepository implements IUsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<void> {
        await prisma.user.create({ data })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        
        return user
    }
}