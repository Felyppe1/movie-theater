import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { useFetch } from "@/hooks/useFetch"
import { IoCloseOutline } from "react-icons/io5";


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
type SeatProps = zod.infer<typeof seatValidationSchema>


const roomAddFormValidationSchema = zod.object({
  number: zod.string().min(1).max(3),
  technology: zod.array(zod.string()).min(1),
  seats: zod.array(seatValidationSchema).min(1)
})
type RoomAddForm = zod.infer<typeof roomAddFormValidationSchema>


const seatsNumberFormValidationSchema = zod.object({
  rows: zod.number().min(0).max(40),
  columns: zod.number().min(0).max(30)
})
type SeatsNumberForm = zod.infer<typeof seatsNumberFormValidationSchema>


const seatPropsFormValidationSchema = zod.object({
  exists: zod.boolean(),
  type: zod.string(),
})
type SeatPropsForm = zod.infer<typeof seatPropsFormValidationSchema>


export function AdminRoomAdd() {
  const { id } = useParams()

  const { data: movieTheater } = useFetch<MovieTheaterProps>(
    `http://localhost:3333/movie-theaters/${id}`, { method: 'GET' }
  )
  const { data: technologies } = useFetch<Technology[]>(
    `http://localhost:3333/technologies`, { method: 'GET' }
  )

  const [columns, setColumns] = useState(0)
  const [selectedSeatIndexes, setSelectedSeatIndexes] = useState([] as number[])

  const form = useForm<RoomAddForm>({
    resolver: zodResolver(roomAddFormValidationSchema),
    defaultValues: {
      number: '',
      technology: [],
      seats: [] 
    }
  })

  form.watch('seats')

  const seatsNumberForm = useForm({
    resolver: zodResolver(seatsNumberFormValidationSchema),
    defaultValues: {
      rows: 0,
      columns: 0
    }
  })

  const seatPropsForm = useForm<SeatPropsForm>({
    resolver: zodResolver(seatPropsFormValidationSchema),
    defaultValues: {
      exists: true,
      type: 'Normal'
    }
  })

  function handleSubmitSeatsNumberForm({ rows, columns }: SeatsNumberForm) {
    event.preventDefault()

    let seats: SeatProps[] = []
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        seats.push({
          // id: `${i.toString() + j.toString()}`,
          row: i.toString(),
          column: j.toString(),
          exists: true,
          type: 'Normal',
          selected: false
        })
      }
    }
    
    setColumns(columns)
    form.setValue('seats', seats)
  }

  function handleSelectSeat(seat: SeatProps, index: number) {
    setSelectedSeatIndexes(state => {
      let newState
      if (seat.selected) {
        newState = state.filter(indx => indx != index)
      } else {
        newState = state.includes(index) ? state : [...state, index]
      }

      if (newState.length > 0) {
        const areAllSeatsHidden = newState?.every(index => form.getValues().seats[index].exists == false)
        if (areAllSeatsHidden) {
          seatPropsForm.setValue('exists', false)
        } else {
          seatPropsForm.setValue('exists', true)
        }
      } else {
        seatPropsForm.setValue('exists', true)
      }

      return newState
    })

    form.getValues().seats[index].selected = !seat.selected
    form.setValue('seats', form.getValues().seats)
  }

  function handleRemoveAllSelectedSeats() {
    selectedSeatIndexes.forEach(index => {
      form.getValues().seats[index].selected = false
      form.setValue('seats', form.getValues().seats)
    })

    seatPropsForm.setValue('exists', true)
    setSelectedSeatIndexes([])
  }

  function handleSubmitSeatPropsForm({ exists, type }: SeatPropsForm) {
    const alteredSeats = form.getValues().seats?.map(seat => {
      if (seat.selected) {
        return {
          ...seat,
          selected: false,
          type,
          exists
        }
      }

      return seat
    })

    setSelectedSeatIndexes([])

    form.setValue('seats', alteredSeats)
  }

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

      <div className='mt-[2rem]'>
        <Label className={`text-base`}>Formato da sala</Label>
        <div className='flex justify-between items-end' >
          <form onSubmit={seatsNumberForm.handleSubmit(handleSubmitSeatsNumberForm)} className='flex items-end gap-x-[1rem]'>
            <div>
              <Label>Linhas</Label>
              <Input 
                type='number' 
                {...seatsNumberForm.register('rows', { valueAsNumber: true })}
                className='h-7 mt-1 w-[7rem]'
              />
            </div>
            <div>
              <Label>Colunas</Label>
              <Input 
                type='number' 
                {...seatsNumberForm.register('columns', { valueAsNumber: true })}
                className='h-7 mt-1 w-[7rem]'
              />
            </div>              
            <Button type='submit' size={'sm'} variant={'outline'}>Atualizar</Button>
          </form>
            
          <div className='flex items-center gap-x-[.25rem]'>
            {selectedSeatIndexes.length > 0 &&
              <>
              <button 
                onClick={handleRemoveAllSelectedSeats}
                className='flex inline-flex items-center justify-center  whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              >
                <IoCloseOutline style={{ fontSize: '1.25rem' }} />
              </button>
              <span className='text-sm'>
                {selectedSeatIndexes.length} selecionadas
              
              </span>
              </>
            }
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Propriedade da cadeira</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <Form {...form}>
                    <form 
                      onSubmit={seatPropsForm.handleSubmit(handleSubmitSeatPropsForm)}
                      className='flex flex-col gap-y-[1rem]'  
                    >
                      <FormField
                        control={seatPropsForm.control}
                        name="type"
                        render={({ field }) => (
                          <>
                            <FormItem className='grid grid-cols-3 items-center gap-4'>
                              <FormLabel>Tipo</FormLabel>
                              <FormControl>
                                <Input placeholder='Normal' {...field} className='col-span-2 h-8' />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </>
                        )}
                      />

                      <FormField
                        control={seatPropsForm.control}
                        name="exists"
                        render={({ field }) => (
                          <FormItem className='grid grid-cols-3 items-center gap-4'>
                            <div>
                              <FormLabel>Existe</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type='submit' variant={'outline'} size={'sm'}>Aplicar</Button>
                    </form>
                  </Form>

                </div>
              </PopoverContent>
            </Popover>
          </div>

        </div>
        <div className='w-fit max-w-[50rem] overflow-hidden my-[1rem]'>
          <div className='grid gap-1' style={{ gridTemplateColumns: `${(columns > 0) ? `repeat(${columns}, 1fr)` : ''}` }}>
            {form.getValues().seats?.map((seat, index) => {
              return (
                <button
                  onClick={() => { handleSelectSeat(seat, index) }}
                  key={`${seat.column}-${seat.row}`}
                  className={`flex max-w-[1.5rem] w-[1.5rem] h-[1.5rem] rounded-sm cursor-pointer
                    ${seat.selected
                      ? 'bg-primary/60 hover:bg-primary/50' 
                      : seat.exists 
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-secondary hover:bg-secondary/70'}
                    `}
                ></button>
              )
            })}
          </div>

          <div className='flex justify-center items-center h-[2rem] bg-primary radius text-primary-foreground mt-[2rem]'>
            {columns > 0 ? 'TELA' : '' }
          </div>
        </div>
      </div>
          
      <Button type='submit' onClick={form.handleSubmit(handleRoomAddForm)} size={'lg'} className='mt-[3rem]'>Salvar</Button>
    </>
  )
}
