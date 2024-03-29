import { Room } from "@/@types/Room"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"

type RoomsListProps = {
  rooms: (Room & {
    _count: {
      seats: number
    }
  })[]
  id?: string
}

export function RoomsList({ rooms, id }: RoomsListProps) {
  return (
    <section className='mt-[1.5rem] pb-[2rem] border-b'>
      <h2 className='text-2xl font-semibold text-secondary-foreground'>
        Salas
      </h2>
      <Button size='sm' asChild>
        <Link to={`/admin/movie-theater/${id}/room/add/`} className='mt-[1rem]'>
          Adicionar sala
        </Link>
      </Button>
      
      <Table className='w-[17rem] mt-1'>
        <TableCaption>Lista de salas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sala</TableHead>
            <TableHead>Cadeiras</TableHead>
            <TableHead>Sessões</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms?.map(room => {
            return (
              <TableRow key={room.id}>
                <TableCell className="font-medium py-2">
                  <Link to={`/admin/movie-theater/room/${room.id}`}>
                    {room.number}
                  </Link>
                </TableCell>
                <TableCell className="py-2">{room._count.seats}</TableCell>
                <TableCell className="py-2">0</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
    
  )
}