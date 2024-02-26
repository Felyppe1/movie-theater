import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import zod from 'zod'

const seatsNumberFormSchema = zod.object({
  rows: zod.number().min(1).max(40),
  columns: zod.number().min(1).max(30)
})
export type SeatsNumberForm = zod.infer<typeof seatsNumberFormSchema>

export function useRoomSeatsNumberForm() {
  const form = useForm<SeatsNumberForm>({
    resolver: zodResolver(seatsNumberFormSchema),
    defaultValues: {
      rows: 0,
      columns: 0
    }
  })

  return { form }
}