import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { UseFormReturn } from "react-hook-form"
import { RoomForm } from ".."
import { useRoomSeatPropsForm } from "./useRoomSeatPropsForm"
import { Dispatch, SetStateAction } from "react"

interface SeatPropsForm {
  type: string
  exists: boolean
}

type AdminRoomSeatPropsFormProps = {
  roomForm: UseFormReturn<RoomForm>
  setSelectedSeatIndexes: Dispatch<SetStateAction<string[]>>
}

export function AdminRoomSeatPropsForm({ roomForm, setSelectedSeatIndexes }: AdminRoomSeatPropsFormProps) {
  const { form: seatPropsForm } = useRoomSeatPropsForm()

  function handleSubmitSeatPropsForm({ exists, type }: SeatPropsForm) {
    const alteredSeats = roomForm.getValues().seats!.map(seatsRow => (
      seatsRow.map(seat => {
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
    ))

    setSelectedSeatIndexes([])

    roomForm.setValue('seats', alteredSeats, { shouldDirty: true })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Propriedade da cadeira</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Form {...roomForm}>
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
  )
}