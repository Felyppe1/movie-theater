import { State, City } from "./Places"
import { MovieGeneral } from "./Movie"
import { Room } from "./Room"

export type MovieTheater = {
  id: string
  name: string
  street: string
  number: string
  created_at: Date
  updated_at: Date
  state_id: string
  city_id: string
}

export type MovieTheaterAdditional = MovieTheater & {
  city: City
  state: State
}

export type MovieTheaterGeneral = MovieTheaterAdditional & {
  movies: MovieGeneral[]
}

export type MovieTheaterFull = MovieTheaterGeneral & {
  rooms: Room[]
}


// export type MovieTheaterRelations = MovieTheater & {
//   city?: City
//   state?: State
//   movies?: MovieGeneral[]
// }