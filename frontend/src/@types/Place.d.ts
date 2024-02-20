export type State = {
  id: string
  name: string
}

export type City = {
  id: string
  name: string
  state_id: string
}

export type Place = State & {
  cities: Pick<City, 'id' | 'name'>[]
}