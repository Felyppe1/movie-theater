import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useParams } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { useFetch } from "@/hooks/useFetch"
import { AdminSeatsSection } from "./AdminSeatsSection"


type Technology = {
  id: string
  name: string
}

export type Room = {
  id: string
  name: string
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
  Room: Room[]
}

const seatValidationSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string(),
  selected: zod.boolean()
});
export type SeatProps = zod.infer<typeof seatValidationSchema>


const roomAddFormValidationSchema = zod.object({
  number: zod.string().min(1).max(3),
  technology: zod.array(zod.string()).min(1),
  seats: zod.array(seatValidationSchema).min(1)
})
export type RoomAddForm = zod.infer<typeof roomAddFormValidationSchema>


export function AdminRoomAdd() {
  const { id } = useParams()

  const { data: movieTheater } = useFetch<MovieTheaterProps>(
    `http://localhost:3333/movie-theaters/${id}`, { method: 'GET' }
  )
  const { data: technologies } = useFetch<Technology[]>(
    `http://localhost:3333/technologies`, { method: 'GET' }
  )

  const form = useForm<RoomAddForm>({
    resolver: zodResolver(roomAddFormValidationSchema),
    defaultValues: {
      number: '',
      technology: [],
      seats: [] 
    }
  })

  form.watch('seats')

  async function handleRoomAddForm({ technology, seats, ...data }: RoomAddForm) {
    const formData = {
      ...data,
      movie_theater_id: id,
      Technology: technology,
      Seat: seats?.map(({ selected, ...seat }) => seat)
    }

    try {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json()

      if (responseData.status === 409) {
        return responseData.message
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <AdminMainHeader h1='Cinemas' p={`Adicionar sala ao ${movieTheater?.name}`} />
    <Form {...form}>
    <form onSubmit={form.handleSubmit(handleRoomAddForm)} className='space-y-8 pt-[1.5rem]'>
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
              name="technology"
              render={({ field }) => {
                return (
                  <FormItem
                    key={technology.id}
                    className="flex flex-row items-start space-x-1 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={(field.value as string[])?.includes(technology.id)}
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
    
    <AdminSeatsSection form={form} />
        
    <Button type='submit' onClick={form.handleSubmit(handleRoomAddForm)} size={'lg'} className='mt-[3rem]'>Salvar</Button>
    </>
  )
}
