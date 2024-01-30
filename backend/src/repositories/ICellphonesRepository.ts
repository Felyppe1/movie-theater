import { Cellphone } from "@prisma/client"

export type CellphonesCreateDTO = {
  ddd: string
  number: string
}

export type CellphonesFindByIdDTO = {
  id: string
}

export type CellphonesFindByDDDAndNumberDTO = {
  ddd: string
  number: string
}

export interface ICellphonesRepository {
  create(data: CellphonesCreateDTO): Promise<Cellphone>
  findById(data: CellphonesFindByIdDTO): Promise<Cellphone | null>
  findByDDDAndNumber(data: CellphonesFindByDDDAndNumberDTO): Promise<Cellphone | null>
}