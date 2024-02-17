export type Seat = {
  id: number
  row: string
  column: string
  exists: boolean
  type: string
  room_id: string
}

export type SeatCreate = Omit<Seat, 'id' | 'room_id'>