import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"

type FormProps = {
  rows: number
  columns: number
}

interface AdminRoomSeatsNumberForm {
  seatsNumberForm: UseFormReturn<FormProps>
  handleSubmitSeatsNumberForm: (data: FormProps) => void
}

export function AdminRoomSeatsNumberForm({ seatsNumberForm, handleSubmitSeatsNumberForm }: AdminRoomSeatsNumberForm) {
  return (
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
  )
}