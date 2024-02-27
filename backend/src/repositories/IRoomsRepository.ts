import { Room, RoomGeneral } from "../@Types/Room"
import { SeatCreate } from "../@Types/Seat"
import { Technology } from "../@Types/Technology"

export type RoomsCreateDTO = Omit<Room, 'id'> & {
  technologyIds: (Technology['id'])[]
  seats: SeatCreate[][]
}

export type RoomsFindByIdDTO = Pick<Room, 'id'>

export type RoomsFindByNumberAndMovieTheaterDTO = Pick<Room, 'number' | 'movie_theater_id'>

export type RoomsUpdateDTO = Room & {
  technologyIds: (Technology['id'])[]
  seats: SeatCreate[][]
}

export type RoomsDeleteDTO = RoomsFindByIdDTO

export interface IRoomsRepository {
  create(data: RoomsCreateDTO): Promise<RoomGeneral>
  findById({ id }: RoomsFindByIdDTO): Promise<RoomGeneral | null>
  findByNumberAndMovieTheater(data: RoomsFindByNumberAndMovieTheaterDTO): Promise<Room | null>
  update(data: RoomsUpdateDTO): Promise<RoomGeneral>
  delete(data: RoomsDeleteDTO): Promise<void>
}