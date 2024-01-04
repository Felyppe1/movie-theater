import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { useQuery } from "@tanstack/react-query"
import { env } from "@/env"

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

  const { data: movieTheater, status, error } = useQuery<MovieTheaterProps>({
    queryKey: ['movieTheater', id],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${queryKey[1]}`, { method: 'GET' })
      
      if (!response.ok) {
        if (response.status === 409) {
          const error = await response.json()
          throw new Error(error.message)
        }

        throw new Error('Algo deu errado')
      }
  
      return response.json()
    },
    retry: false
  })

  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
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