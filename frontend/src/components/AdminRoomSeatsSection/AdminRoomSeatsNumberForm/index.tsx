import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SeatsNumberForm, useRoomSeatsNumberForm } from "./useRoomSeatsNumberForm"
import { RoomForm } from ".."
import { UseFormReturn } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"

interface AdminRoomSeatsNumberForm {
  roomForm: UseFormReturn<RoomForm>
  setSelectedSeatIndexes: Dispatch<SetStateAction<string[]>>
}

export function AdminRoomSeatsNumberForm({ roomForm, setSelectedSeatIndexes }: AdminRoomSeatsNumberForm) {
  const { form: seatsNumberForm } = useRoomSeatsNumberForm()
  
  function handleSubmitSeatsNumberForm({ rows, columns }: SeatsNumberForm) {
    event?.preventDefault()

    const seats: RoomForm['seats'] = []
    
    for (let i = 0; i < rows; i++) {
      const seatsRow = []

      for (let j = 0; j < columns; j++) {
        seatsRow.push({
          // id: `${i.toString() + j.toString()}`,
          row: i.toString(),
          column: j.toString(),
          exists: true,
          type: 'Normal',
          selected: false
        })
      }

      seats.push(seatsRow)
    }
    
    setSelectedSeatIndexes([])
    roomForm.setValue('seats', seats, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <form onSubmit={seatsNumberForm.handleSubmit(handleSubmitSeatsNumberForm)} className='flex items-end gap-x-[.5rem]'>
      <div>
        <Label className={cn(seatsNumberForm.formState.errors?.rows && 'text-destructive')}>Linhas</Label>
        <Input 
          type='number' 
          {...seatsNumberForm.register('rows', { valueAsNumber: true })}
          className='h-7 mt-1 max-w-[7rem]'
        />
      </div>
      <div>
        <Label className={cn(seatsNumberForm.formState.errors?.columns && 'text-destructive')}>Colunas</Label>
        <Input 
          type='number' 
          {...seatsNumberForm.register('columns', { valueAsNumber: true })}
          className='h-7 mt-1 max-w-[7rem]'
        />
      </div>              
      <Button type='submit' size={'sm'} variant={'outline'}>Atualizar</Button>
    </form>
  )
}