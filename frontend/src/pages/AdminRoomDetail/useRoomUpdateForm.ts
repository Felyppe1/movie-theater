import { updateRoom } from '@/api/rooms';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import zod from 'zod'

const seatSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1),
  selected: zod.boolean().optional()
})

const roomUpdateFormSchema = zod.object({
  number: zod.string().min(1).max(5),
  technologyIds: zod.array(zod.string().min(1)).min(1),
  seats: zod.array(seatSchema).min(1)
})
export type RoomUpdateForm = zod.infer<typeof roomUpdateFormSchema>

export function useRoomUpdateForm({ number, technologyIds, seats }: RoomUpdateForm) {
  const queryClient = useQueryClient()

  const form = useForm<RoomUpdateForm>({
    resolver: zodResolver(roomUpdateFormSchema),
    defaultValues: {
      number,
      technologyIds,
      seats
    } 
  })

  const mutation = useMutation({
    mutationFn: updateRoom,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['room', response.id] })
      toast({ description: 'Sala atualizada com sucesso', variant: 'success' })
      form.reset(form.getValues())
    }
  })

  return { form, mutation }
}