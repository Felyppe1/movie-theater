import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { UseFormReturn } from "react-hook-form"
import { AddRoomForm } from "../useAdminRoomViewForm"

interface SeatPropsForm {
  type: string
  exists: boolean
}

type AdminRoomSeatPropsFormProps = {
  addRoomForm: UseFormReturn<AddRoomForm>
  seatPropsForm: UseFormReturn<SeatPropsForm>
  handleSubmitSeatPropsForm: (data: SeatPropsForm) => void
}

export function AdminRoomSeatPropsForm({ addRoomForm, seatPropsForm, handleSubmitSeatPropsForm }: AdminRoomSeatPropsFormProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Propriedade da cadeira</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Form {...addRoomForm}>
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