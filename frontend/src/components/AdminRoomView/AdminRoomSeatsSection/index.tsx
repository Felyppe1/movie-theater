import { IoCloseOutline } from "react-icons/io5"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from 'zod'
import { AdminRoomSeatsNumberForm } from "./AdminRoomSeatsNumberForm"
import { AdminRoomSeatsGrid } from "./AdminRoomSeatsGrid"
import { AdminRoomSeatPropsForm } from "./AdminRoomSeatPropsForm"
import { AddRoomForm, SeatProps } from "../useAdminRoomViewForm"
import { Button } from "@/components/ui/button"

const seatsNumberFormValidationSchema = zod.object({
  rows: zod.number().min(0).max(40),
  columns: zod.number().min(0).max(30)
})
type SeatsNumberForm = zod.infer<typeof seatsNumberFormValidationSchema>

const seatPropsFormValidationSchema = zod.object({
  exists: zod.boolean(),
  type: zod.string(),
})
type SeatPropsForm = zod.infer<typeof seatPropsFormValidationSchema>


interface AdminSeatsSectionProps {
  form: UseFormReturn<AddRoomForm>
}

export function AdminRoomSeatsSection({ form }: AdminSeatsSectionProps) {
  const [columns, setColumns] = useState(0)
  const [selectedSeatIndexes, setSelectedSeatIndexes] = useState([] as number[])
  
  const seatsNumberForm = useForm({
    resolver: zodResolver(seatsNumberFormValidationSchema),
    defaultValues: {
      rows: 0,
      columns: 0
    }
  })

  useEffect(() => {
    if (form) {
      const columnSet = new Set()
      const rowSet = new Set()
      form.getValues().seats?.forEach(({ row, column }) => {
        rowSet.add(row)
        columnSet.add(column)
      })

      setColumns(columnSet.size)
      seatsNumberForm.setValue('rows', rowSet.size)
      seatsNumberForm.setValue('columns', columnSet.size)
    }

  }, [])

  const seatPropsForm = useForm<SeatPropsForm>({
    resolver: zodResolver(seatPropsFormValidationSchema),
    defaultValues: {
      exists: true,
      type: 'Normal'
    }
  })

  function handleSubmitSeatsNumberForm({ rows, columns }: SeatsNumberForm) {
    event.preventDefault()

    const seats: SeatProps[] = []
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        seats.push({
          // id: `${i.toString() + j.toString()}`,
          row: i.toString(),
          column: j.toString(),
          exists: true,
          type: 'Normal',
          selected: false
        })
      }
    }
    
    setColumns(columns)
    form.setValue('seats', seats, { shouldDirty: true, shouldValidate: true })
  }

  function handleSelectSeat(seat: SeatProps, seatIndex: number) {
    setSelectedSeatIndexes(state => {
      let newState
      if (seat.selected) {
        newState = state.filter(indx => indx != seatIndex)
      } else {
        newState = state.includes(seatIndex) ? state : [...state, seatIndex]
      }
      
      if (newState.length > 0) {
        const areAllSeatsHidden = newState?.every(index => form.getValues().seats![index].exists == false)
        if (areAllSeatsHidden) {
          seatPropsForm.setValue('exists', false)
        } else {
          seatPropsForm.setValue('exists', true)
        }
      } else {
        seatPropsForm.setValue('exists', true)
      }

      return newState
    })
    form.getValues().seats![seatIndex].selected = !seat.selected
    form.setValue('seats', form.getValues().seats)
  }

  function handleRemoveAllSelectedSeats() {
    selectedSeatIndexes.forEach(index => {
      (form.getValues().seats as SeatProps[])[index].selected = false
      form.setValue('seats', form.getValues().seats)
    })

    seatPropsForm.setValue('exists', true)
    setSelectedSeatIndexes([])
  }

  function handleSubmitSeatPropsForm({ exists, type }: SeatPropsForm) {
    const alteredSeats = form.getValues().seats!.map(seat => {
      if (seat.selected) {
        return {
          ...seat,
          selected: false,
          type,
          exists
        }
      }

      return seat
    })

    setSelectedSeatIndexes([])

    form.setValue('seats', alteredSeats)
  }

  return (
    <div className='mt-[2rem]'>
      <Label className={`text-base ${form.formState.errors?.seats && 'text-destructive'}`}>Formato da sala</Label>
      <div className='flex justify-between items-end' >
        <AdminRoomSeatsNumberForm 
          seatsNumberForm={seatsNumberForm} 
          handleSubmitSeatsNumberForm={handleSubmitSeatsNumberForm}
        />
          
        <div className='flex items-center gap-x-[.25rem]'>
          {selectedSeatIndexes.length > 0 &&
            <>
            <Button onClick={handleRemoveAllSelectedSeats} size='tiny' variant='outline'>
              <IoCloseOutline style={{ fontSize: '1.25rem' }} />
            </Button>
            <span className='text-sm'>
              {selectedSeatIndexes.length} selecionadas
            </span>
            </>
          }

          <AdminRoomSeatPropsForm
            addRoomForm={form}
            seatPropsForm={seatPropsForm}
            handleSubmitSeatPropsForm={handleSubmitSeatPropsForm}
          />
        </div>
      </div>
      <AdminRoomSeatsGrid
        addRoomForm={form}
        columnsNumber={columns}
        handleSelectSeat={handleSelectSeat}
      />
    </div>
  )
}