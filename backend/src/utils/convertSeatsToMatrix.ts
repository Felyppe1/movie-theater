import { SeatCreate } from "../@Types/Seat";

export function convertSeatsToMatrix(seats: SeatCreate[]) {

  const seatsObjectMatrix = seats.reduce((before, seat) => {
    const row = seat.row

    if (!before[row]) {
      before[row] = []
    }

    before[row].push(seat)

    return before
  }, {})

  return Object.values(seatsObjectMatrix)
}