import { Technology } from "../@Types/Technology";


export interface ITechnologiesRepository {
  getAll(): Promise<Technology[]>
}