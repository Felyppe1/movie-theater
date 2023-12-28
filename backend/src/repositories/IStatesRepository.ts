import { State } from "@prisma/client";

export interface IStatesRepository {
  getAll(): Promise<State[]>
}