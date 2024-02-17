import { Places } from "../@Types/Places"


export interface IStatesRepository {
  getAll(): Promise<Places[]>
}