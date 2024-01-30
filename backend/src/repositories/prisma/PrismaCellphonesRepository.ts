import { prisma } from "../../lib/prisma";
import { CellphonesCreateDTO, CellphonesFindByDDDAndNumberDTO, CellphonesFindByIdDTO, ICellphonesRepository } from "../ICellphonesRepository";

export class PrismaCellphonesRepository implements ICellphonesRepository {
  async create(data: CellphonesCreateDTO){
    const cellphone = await prisma.cellphone.create({
      data
    })

    return cellphone
  }

  async findById({ id }: CellphonesFindByIdDTO) {
    const cellphone = await prisma.cellphone.findUnique({ where: { id: id }})

    return cellphone
  }

  
  async findByDDDAndNumber({ ddd, number }: CellphonesFindByDDDAndNumberDTO) {
    const cellphone = await prisma.cellphone.findFirst({
      where: {
        ddd,
        number
      }
    })

    return cellphone
  }

}