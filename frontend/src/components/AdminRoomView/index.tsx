import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminRoomSeatsSection } from "./AdminRoomSeatsSection"
import { AddRoomForm, SeatProps, useAdminRoomViewForm } from "./useAdminRoomViewForm"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchTechnologies } from "@/api/technologies"
import { deleteRoom } from "@/api/rooms"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

interface AdminRoomViewProps {
  number?: string,
  selectedTechnologyIds?: string[]
  seats?: Omit<SeatProps, 'selected'>[],
  movie_theater_id: string
  room_id?: string
}

export function AdminRoomView({ 
  movie_theater_id,
  room_id ,
  number = '', 
  selectedTechnologyIds = [], 
  seats = []
}: AdminRoomViewProps) {
  const navigate = useNavigate()

  const { data: technologies, status, error } = useQuery({
    queryKey: ['technologies'],
    queryFn: fetchTechnologies
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRoom,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ description: 'Sala excluída com sucesso', variant: 'success' })
      navigate(`/admin/movie-theater/${movie_theater_id}`)
    }
  })

  const { form, createMutation, updateMutation } = useAdminRoomViewForm({
    number, 
    seats,
    technologyIds: selectedTechnologyIds
  })

  const handleSubmitRoomViewForm = ({ technologyIds, seats, ...formData }: AddRoomForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cleanedData = {
      ...formData,
      movie_theater_id,
      technologyIds,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      seats: seats?.map(({ selected, ...seat }) => seat),
    }

    // room_id ? updateMutation.mutate({ data: cleanedData, room_id }) : createMutation.mutate({ data: cleanedData })
  }

  const handleDeleteRoom = (room_id: string) => {
    deleteMutation.mutate({ room_id })
  }

  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : ( 
    <>
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(handleSubmitRoomViewForm)} 
      className='space-y-8 pt-[1.5rem]'
    >
      <FormField
        control={form.control}
        name="number"
        render={({ field }) => (
          <>
          <FormItem>
            <FormLabel className='text-base'>Número</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              Número da sala do cinema.
            </FormDescription>
            <FormMessage />
          </FormItem>
          </>
        )}
      />

      <div>
        <Label className='text-base'>Tecnologias</Label>
        <div className="flex flex-wrap gap-x-[1.5rem] gap-y-[.25rem] py-2">
          {technologies?.map((technology) => (
            <FormField
              key={technology.id}
              control={form.control}
              name="technologyIds"
              render={({ field }) => {
                return (
                  <FormItem
                    key={technology.id}
                    className="flex flex-row items-start space-x-1 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.some(tech => tech === technology.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, technology.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== technology.id
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {technology.name}
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
        </div>
        <FormDescription>Tecnologias que a tela da sala suporta.</FormDescription>
      </div>
    </form>
    </Form>

    <AdminRoomSeatsSection form={form} />
    
    <div className='flex gap-x-[1rem]'>
      {room_id &&
        <Button 
          type='submit' 
          onClick={() => handleDeleteRoom(room_id)} 
          disabled={deleteMutation.isPending || updateMutation.isPending} 
          size='lg' 
          variant='destructive' 
          className='mt-[3rem]'
        >
          Excluir
        </Button>
      }
      <Button 
        type='submit' 
        onClick={form.handleSubmit(handleSubmitRoomViewForm)} 
        disabled={createMutation.isPending || updateMutation.isPending || !form.formState.isDirty}
        size='lg' 
        className='mt-[3rem]'
      >
        Salvar
      </Button>
    </div>
    </>
  )
}