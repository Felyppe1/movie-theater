import { IoCloseOutline } from "react-icons/io5"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { AdminRoomSeatsNumberForm } from "./AdminRoomSeatsNumberForm"
import { AdminRoomSeatsGrid } from "./AdminRoomSeatsGrid"
import { AdminRoomSeatPropsForm } from "./AdminRoomSeatPropsForm"
import { Button } from "@/components/ui/button"
import { useRoomSeatPropsForm } from "./AdminRoomSeatPropsForm/useRoomSeatPropsForm"
import { RoomUpdateForm } from "@/pages/AdminRoomDetail/useRoomUpdateForm"

export type RoomForm = RoomUpdateForm

type AdminRoomSeatsSectionProps = {
  form: UseFormReturn<RoomForm>
}

export function AdminRoomSeatsSection({ form }: AdminRoomSeatsSectionProps) {
  const [selectedSeatIndexes, setSelectedSeatIndexes] = useState([] as string[])

  const { form: seatPropsForm } = useRoomSeatPropsForm()

  function handleRemoveAllSelectedSeats() {
    form.getValues().seats.forEach((seatsRow, rowIndex) => {
      seatsRow.forEach((_, colIndex) => form.setValue(`seats.${rowIndex}.${colIndex}.selected`, false))
    })

    //TODO: store row-col to be able to get it here
    // selectedSeatIndexes.forEach(index => {
    //   (form.getValues().seats as RoomForm['seats'])[index].selected = false
    //   form.setValue('seats', form.getValues().seats)
    // })

    seatPropsForm.setValue('exists', true)
    setSelectedSeatIndexes([])
  }

  return (
    <div className='mt-[2rem]'>
      <Label className={`text-base ${form.formState.errors?.seats && 'text-destructive'}`}>Formato da sala</Label>
      <div className='flex flex-wrap justify-between items-end gap-4 mb-4' >
        <AdminRoomSeatsNumberForm
          setSelectedSeatIndexes={setSelectedSeatIndexes}
          roomForm={form}
        />
          
        <div className='flex flex-col-reverse xs:flex-row items-start xs:items-center gap-[.25rem] flex-wrap shrink-0'>
          {selectedSeatIndexes.length > 0 &&
            <div className='flex items-center gap-1'>
              <Button onClick={handleRemoveAllSelectedSeats} size='tiny' variant='outline'>
                <IoCloseOutline style={{ fontSize: '1.25rem' }} />
              </Button>
              <span className='text-sm'>
                {selectedSeatIndexes.length} selecionadas
              </span>
            </div>
          }

          <AdminRoomSeatPropsForm
            roomForm={form}
            setSelectedSeatIndexes={setSelectedSeatIndexes}
          />
        </div>
      </div>
      <AdminRoomSeatsGrid
        roomForm={form}
        setSelectedSeatIndexes={setSelectedSeatIndexes}
      />
    </div>
  )
}