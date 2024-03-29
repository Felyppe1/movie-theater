import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"

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