import { Prisma, ROLE, SEX } from "@prisma/client";

export interface ICreateUserDTO {
    email: string
    password: string
    full_name: string
    social_name?: string
    cpf: string
    sex: SEX
    date_of_birth: Date
    role: ROLE
    cellphone: string
    state_id: string
    city_id: string
}