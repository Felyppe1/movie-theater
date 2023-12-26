import { Prisma } from "@prisma/client";

type ICreateUserDTO = Omit<Prisma.UserCreateInput, 'password_hash'> & {
    password: string
}