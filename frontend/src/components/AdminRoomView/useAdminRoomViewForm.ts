import { createRoom, updateRoom } from '@/api/rooms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import zod from 'zod'
import { toast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

const technologySchema = zod.object({
  id: zod.string().min(1),
  name: zod.string().optional()
})
export type TechnologyProps = zod.infer<typeof technologySchema>


const seatSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1),
  selected: zod.boolean().optional()
});
export type SeatProps = zod.infer<typeof seatSchema>


const adminRoomViewFormSchema = zod.object({
  number: zod.string().min(1).max(5),
  technologyIds: zod.array(zod.string().min(1)).min(1),
  seats: zod.array(seatSchema).min(1)
})
export type AddRoomForm = zod.infer<typeof adminRoomViewFormSchema>


export function useAdminRoomViewForm({ number = '', technologyIds = [], seats = [] }: AddRoomForm) {
  const navigate = useNavigate()
  
  const form = useForm({
    resolver: zodResolver(adminRoomViewFormSchema),
    defaultValues: {
      number,
      technologyIds,
      seats
    }
  })

  form.watch('seats')

  const createMutation = useMutation({
    mutationFn: createRoom,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: (response) => {
      toast({ description: 'Sala criada com sucesso', variant: 'success' })
      navigate(`/admin/movie-theater/room/${response.id}`)
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateRoom,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ description: 'Sala atualizada com sucesso', variant: 'success' })
      form.reset(form.getValues())
    }
  })

  return { form, createMutation, updateMutation }
}