import { Cellphone } from "../../@Types/Cellphone";
import { CellphonesCreateDTO, CellphonesFindByDDDAndNumberDTO, CellphonesFindByIdDTO, ICellphonesRepository } from "../ICellphonesRepository";

export class InMemoryCellphonesRepository implements ICellphonesRepository {
  public items: Cellphone[] = []
  
  async create(data: CellphonesCreateDTO) {
    const cellphone = {
      ...data,
      id: 'abcdef'
    }

    this.items.push(cellphone)

    return cellphone
  }

  async findById(data: CellphonesFindByIdDTO) {
    const cellphone = this.items.find(cellphone => cellphone.id === data.id)

    if (!cellphone) return null

    return cellphone
  }

  async findByDDDAndNumber(data: CellphonesFindByDDDAndNumberDTO) {
    const cellphone = this.items.find(cellphone => cellphone.ddd === data.ddd && cellphone.number === data.number)

    if (!cellphone) return null

    return cellphone
  }
}