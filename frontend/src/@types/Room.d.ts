import { SeatCreate } from "./Seat"
import { Technology } from "./Technology"

export type Room = {
  id: string
  number: string
  movie_theater_id: string
}

export type RoomGeneral = Room & {
  seats: SeatCreate[][]
  technologies: Technology[]
}