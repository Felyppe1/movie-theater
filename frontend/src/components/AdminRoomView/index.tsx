import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminRoomSeatsSection } from "./AdminRoomSeatsSection"
import { SeatProps, TechnologyProps, useAdminRoomViewForm } from "./useAdminRoomViewForm"
import { useSubmitRoomForm } from "./useSubmitRoomForm"
import { Toaster } from "../ui/toaster"
import { useQuery } from "@tanstack/react-query"
import { fetchTechnologies } from "@/api/technologies"

interface AdminRoomViewProps {
  number?: string,
  selectedTechnologyIds?: string[]
  seats?: Omit<SeatProps, 'selected'>[],
  movie_theater_id: string
  room_id?: string
}

export function AdminRoomView({ 
  number = '', 
  selectedTechnologyIds = [], 
  seats = [], 
  movie_theater_id, room_id 
}: AdminRoomViewProps) {

  const { data: technologies, status, error } = useQuery<TechnologyProps[]>({
    queryKey: ['technologies'],
    queryFn: fetchTechnologies
  })

  const { form } = useAdminRoomViewForm({
    number, 
    seats,
    technologyIds: selectedTechnologyIds
  })

  const { handleAddRoomForm, handleDeleteRoom, isLoading } = useSubmitRoomForm({ room_id, movie_theater_id })

  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : ( 
    <>
    <Toaster />
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(handleAddRoomForm)} 
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
        <Button type='submit' onClick={handleDeleteRoom} disabled={isLoading} size='lg' variant='destructive' className='mt-[3rem]'>Excluir</Button>
      }
      <Button 
        type='submit' 
        onClick={form.handleSubmit(handleAddRoomForm)} 
        disabled={isLoading || !form.formState.isDirty}
        size='lg' 
        className='mt-[3rem]'
      >
        Salvar
      </Button>
    </div>
    </>
  )
}