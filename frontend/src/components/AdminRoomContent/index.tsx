import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFetch } from "@/hooks/useFetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zod, { ZodString, ZodBoolean, ZodObject } from 'zod'
import { AdminRoomSeatsSection } from "./AdminRoomSeatsSection"

const technologyValidationSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(1)
})
type Technology = zod.infer<typeof technologyValidationSchema>


const seatValidationSchema = zod.object({
  id: zod.number().optional(),
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1),
  selected: zod.boolean().optional()
});
export type SeatProps = zod.infer<typeof seatValidationSchema>


const roomAddFormValidationSchema = zod.object({
  number: zod.string().min(1).max(3),
  technology: zod.array(technologyValidationSchema).min(1),
  seats: zod.array(seatValidationSchema).min(1)
})
export type RoomAddForm = zod.infer<typeof roomAddFormValidationSchema>


interface AdminRoomContentProps {
  number?: string,
  selectedTechnologies?: Technology[]
  seats?: Omit<SeatProps, 'selected'>[],
  movie_theater_id: string
}

export function AdminRoomContent({ number, selectedTechnologies, seats, movie_theater_id }: AdminRoomContentProps) {
  const { data: technologies } = useFetch<Technology[]>(
    `http://localhost:3333/technologies`, { method: 'GET' }
  )

  const form = useForm<RoomAddForm>({
    resolver: zodResolver(roomAddFormValidationSchema),
    defaultValues: {
      number,
      technology: selectedTechnologies,
      seats
    }
  })

  console.log(form.formState.errors)

  form.watch('seats')

  async function handleRoomAddForm({ technology, seats, ...data }: RoomAddForm) {
    const formData = {
      ...data,
      movie_theater_id,
      Technology: technology,
      Seat: seats?.map(({ selected, ...seat }) => seat)
    }

    console.log(formData)
    // try {
    //   const response = await fetch('http://localhost:3333/rooms', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   })

    //   const responseData = await response.json()

    //   if (responseData.status === 409) {
    //     return responseData.message
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }
  
  return (
    <>
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(handleRoomAddForm)} 
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
              name="technology"
              render={({ field }) => {
                return (
                  <FormItem
                    key={technology.id}
                    className="flex flex-row items-start space-x-1 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value.some(tech => tech.id === technology.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, technology])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value.id !== technology.id
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

    <Button type='submit' onClick={form.handleSubmit(handleRoomAddForm)} size={'lg'} className='mt-[3rem]'>Salvar</Button>
    </>
  )
}