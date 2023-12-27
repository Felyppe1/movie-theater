import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

type MovieTheater = {
  id: string
  name: string
  address: string
}

const movieTheaters: MovieTheater[] = [
    {
        id: '1',
        name: 'Cineplex',
        address: '123 Main Street',
    },
    {
        id: '2',
        name: 'MegaCinema',
        address: '456 Oak Avenue',
    },
    {
        id: '3',
        name: 'Star Cinemas',
        address: '789 Pine Lane',
    },
    {
        id: '4',
        name: 'Silver Screens',
        address: '101 Broadway',
    },
    {
        id: '5',
        name: 'Golden Theatre',
        address: '202 Elm Street',
    },
    {
        id: '6',
        name: 'Dream Cinemas',
        address: '303 Maple Avenue',
    },
    {
        id: '7',
        name: 'Sunset Movies',
        address: '404 Cedar Lane',
    },
    {
        id: '8',
        name: 'City Center Cinemas',
        address: '505 Spruce Street',
    },
    {
        id: '9',
        name: 'Prestige Theatres',
        address: '606 Pine Lane',
    },
    {
        id: '10',
        name: 'Royal Cineworld',
        address: '707 Oak Avenue',
    }
]

const columns: ColumnDef<MovieTheater>[] = [
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
    header: 'Endereço'
  }
]

export function AdminMovieTheaterList() {
  return (
    <div>
      <DataTable columns={columns} data={movieTheaters} />
      {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
      </div> */}
    </div>
  )
}


