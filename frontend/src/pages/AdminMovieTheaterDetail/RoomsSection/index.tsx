import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { RoomProps } from ".."
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type RoomSectionProps = {
  rooms: RoomProps[]
  id: string
}

export function RoomsSection({ rooms, id }: RoomSectionProps) {
  return (
    <>
      <Button asChild>
        <Link to={`/admin/movie-theater/room/add/${id}`} className='mt-[1rem]'>
          Adicionar sala
        </Link>
      </Button>

      <Table className='w-[17rem]'>
        <TableCaption>Lista de salas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sala</TableHead>
            <TableHead>Cadeiras</TableHead>
            <TableHead>Sessões</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium py-2">4</TableCell>
            <TableCell className="py-2">250</TableCell>
            <TableCell className="py-2">4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}