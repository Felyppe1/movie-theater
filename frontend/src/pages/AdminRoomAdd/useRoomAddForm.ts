import { createRoom } from '@/api/rooms';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import zod from 'zod'

const seatSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1),
  selected: zod.boolean().optional()
})

const roomAddFormSchema = zod.object({
  number: zod.string().min(1).max(5),
  technologyIds: zod.array(zod.string().min(1)).min(1),
  seats: zod.array(seatSchema).min(1)
})
export type RoomAddForm = zod.infer<typeof roomAddFormSchema>

export function useRoomAddForm() {
  const form = useForm<RoomAddForm>({
    resolver: zodResolver(roomAddFormSchema),
    defaultValues: {
      number: '',
      technologyIds: [],
      seats: []
    } 
  })

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createRoom,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: (response) => {
      toast({ description: 'Sala criada com sucesso', variant: 'success' })
      navigate(`/admin/movie-theater/room/${response.id}`)
    }
  })

  return { form, mutation }
}