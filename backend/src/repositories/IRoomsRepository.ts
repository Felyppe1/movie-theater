import { Room } from "@prisma/client"

type Seat = {
  row: string
  column: string
  exists: boolean
  type: string
}

export type RoomsCreateDTO = {
  number: string
  movie_theater_id: string
  technologyIds: string[]
  seats: Seat[]
}

export type RoomsFindByIdDTO = {
  id: string
}

export type RoomsFindByNumberAndMovieTheaterDTO = {
  number: string
  movie_theater_id: string
}

export type RoomsUpdateDTO = {
  id: string
  number: string
  movie_theater_id: string
  technologyIds: string[]
  seats: Seat[]
}

export type RoomsDeleteDTO = RoomsFindByIdDTO

export interface IRoomsRepository {
  create(data: RoomsCreateDTO): Promise<Room>
  findById({ id }: RoomsFindByIdDTO): Promise<Room | null>
  findByNumberAndMovieTheater(data: RoomsFindByNumberAndMovieTheaterDTO): Promise<Room | null>
  update(data: RoomsUpdateDTO): Promise<Room>
  delete(data: RoomsDeleteDTO): Promise<void>
}