import { MovieTheaterAdditional } from "@/@types/MovieTheater";
import { AdminMainHeader } from "@/components/ui/AdminMainHeader";
import { DataTable } from "@/components/ui/DataTable"
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { Button } from "@/components/ui/button"
import { useFetchMovieTheaters } from "@/hooks/api/useFetchMovieTheaters";
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { FaArrowRightArrowLeft, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


const columns: ColumnDef<MovieTheaterAdditional>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <FaArrowRightArrowLeft className="rotate-90 ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Button variant={"link"} asChild>
          <Link to={`/admin/movie-theater/${row.original.id}`}>{row.original.name}</Link>
        </Button>
      )
    }
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
    cell: ({ row }) => {
      return <h1>{row.original.street}, Lote {row.original.number}</h1>
    }
  },
  {
    accessorKey: 'updated_at',
    header: 'Modificado em',
    cell: ({ row }) => {
      return format(row.original.updated_at, "dd/MM/yyyy HH:mm:ss")
    }
  }
]

export function AdminMovieTheaterList() {
  const { data: movieTheaters, status, error } = useFetchMovieTheaters()

  return (
    <>
      <AdminMainHeader h1='Cinemas' p='Lista de cinemas do sistema' backLink='/admin' />
      {status === 'pending' ? (
        <LoadingDisplay />
      ) : status === 'error' ? (
        <ErrorDisplay message={error.message} />
      ) : (
        <div className='pt-[1.5rem]'>
          <Button asChild>
            <Link to='/admin/movie-theater/add'>
              <FaPlus className='mr-2 h-4 w-4' />
              Cadastrar  
            </Link>
          </Button>
          <DataTable columns={columns} data={movieTheaters} />
        </div>
      )}
    </>
  )
}


