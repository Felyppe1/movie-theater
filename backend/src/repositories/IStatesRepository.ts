type State = {
  id: string
  name: string
  cities: {
    id: string
    name: string
  }[]
}

export interface IStatesRepository {
  getAll(): Promise<State[]>
}