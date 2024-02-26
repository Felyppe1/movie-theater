import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import zod from 'zod'

const seatPropsFormSchema = zod.object({
  exists: zod.boolean(),
  type: zod.string(),
})
export type SeatPropsForm = zod.infer<typeof seatPropsFormSchema>

export function useRoomSeatPropsForm() {
  const form = useForm<SeatPropsForm>({
    resolver: zodResolver(seatPropsFormSchema),
    defaultValues: {
      exists: true,
      type: 'Normal'
    }
  })

  return { form }
}