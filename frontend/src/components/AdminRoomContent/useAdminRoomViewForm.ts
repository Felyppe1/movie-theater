import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import zod from 'zod'

const technologyValidationSchema = zod.object({
  id: zod.string().min(1),
  name: zod.string().optional()
})
export type TechnologyProps = zod.infer<typeof technologyValidationSchema>


const seatValidationSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1),
  selected: zod.boolean().optional()
});
export type SeatProps = zod.infer<typeof seatValidationSchema>


const roomAddFormValidationSchema = zod.object({
  number: zod.string().min(1).max(5),
  technologyIds: zod.array(zod.string().min(1)).min(1),
  seats: zod.array(seatValidationSchema).min(1)
})
export type AddRoomForm = zod.infer<typeof roomAddFormValidationSchema>


export function useAdminRoomViewForm({ number = '', technologyIds = [], seats = [] }: AddRoomForm) {
  const form = useForm({
    resolver: zodResolver(roomAddFormValidationSchema),
    defaultValues: {
      number,
      technologyIds,
      seats
    }
  })

  form.watch('seats')

  return { form }
}