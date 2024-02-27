import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { fetchTechnologies } from "@/api/technologies"
import { RoomAddForm, useRoomAddForm } from "../useRoomAddForm"
import { AdminRoomSeatsSection } from "@/components/AdminRoomSeatsSection"

type AdminRoomAddContentProps = {
  movie_theater_id: string
}

export function AdminRoomAddContent({ movie_theater_id }: AdminRoomAddContentProps) {
  const { data: technologies } = useQuery({
    queryKey: ['technologies'],
    queryFn: fetchTechnologies
  })

  const { form, mutation } = useRoomAddForm()

  const handleOnSubmit = (data: RoomAddForm) => {
    const cleanedData = {
      ...data,
      movie_theater_id,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      seats: data.seats?.map(seatsRow => seatsRow.map(({ selected, ...seat }) => seat)),
    }
    mutation.mutate(cleanedData)
  }
  
  return (
    <>
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(handleOnSubmit)} 
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
      <Button 
        type='submit' 
        onClick={form.handleSubmit(handleOnSubmit)} 
        disabled={mutation.isPending || !form.formState.isDirty}
        size='lg' 
        className='mt-[3rem]'
      >
        Salvar
      </Button>
    </div>
    </>
  )
}