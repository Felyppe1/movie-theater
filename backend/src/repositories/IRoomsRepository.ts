import { Room } from "@prisma/client"

interface Seat {
  row: string
  column: string
  exists: boolean
  type: string
}

export interface ICreateRoomRepositoryDTO {
  number: string
  movie_theater_id: string
  technologyIds: { id: string }[]
  seats: Seat[]
}

export interface IRoomsRepository {
  create(data: ICreateRoomRepositoryDTO): Promise<void>
  findById(id: string): Promise<Room | null>
  findByNumberAndMovieTheater(number: string, movie_theater_id: string): Promise<Room | null>
}