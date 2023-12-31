import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { IoCloseOutline } from "react-icons/io5"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RoomAddForm, SeatProps } from ".."
import { useState } from "react"
import { UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from 'zod'

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


interface AdminSeatsSectionProps {
  form: UseFormReturn<RoomAddForm>
}

export function AdminSeatsSection({ form }: AdminSeatsSectionProps) {
  const [columns, setColumns] = useState(0)
  const [selectedSeatIndexes, setSelectedSeatIndexes] = useState([] as number[])

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

  return (
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
  )
}