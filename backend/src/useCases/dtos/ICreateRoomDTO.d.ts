import { Prisma } from "@prisma/client"

interface Seat {
  row: string
  column: string
  exists: boolean
  type: string
}

export interface ICreateRoomRequestDTO {
  number: string
  movie_theater_id: string
  Technology: string[]
  Seat: Seat[]
}