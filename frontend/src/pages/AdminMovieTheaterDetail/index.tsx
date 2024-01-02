import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { Button } from "@/components/ui/button"
import { useLocation, useParams } from "react-router-dom"
import { useFetch } from "@/hooks/useFetch"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export type RoomProps = {
  id: string
  number: string
  _count: { seats: number }
}

type MovieTheaterProps = {
  id: string
  name: string
  street: string
  number: string
  created_at: Date
  updated_at: Date
  state_id: string
  city_id: string
  Room: RoomProps[]
}

export function AdminMovieTheaterDetail() {
  const { id } = useParams()

  const { data: movieTheater } = useFetch<MovieTheaterProps>(
    `http://localhost:3333/movie-theaters/${id}`,
    { method: 'GET' }
  )

  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    if (location.state?.messages) {
      location.state?.messages?.map((message: { description: string, variant: 'success' | 'destructive' | 'default' }) => {
        toast({ description: message.description, variant: message.variant })
      })
    }
  }, [])
  
  return (
    <>
      <Toaster />
      <AdminMainHeader h1='Cinemas' p={`Informações do cinema ${movieTheater?.name}`} />
      
      <Button asChild>
        <Link to={`/admin/movie-theater/${id}/room/add/`} className='mt-[1rem]'>
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
          {movieTheater?.Room?.map(room => {
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
    </>
  )
}