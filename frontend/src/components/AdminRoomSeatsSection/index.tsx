import { IoCloseOutline } from "react-icons/io5"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { AdminRoomSeatsNumberForm } from "./AdminRoomSeatsNumberForm"
import { AdminRoomSeatsGrid } from "./AdminRoomSeatsGrid"
import { AdminRoomSeatPropsForm } from "./AdminRoomSeatPropsForm"
import { Button } from "@/components/ui/button"
import { RoomAddForm } from "@/pages/AdminRoomAdd/useRoomAddForm"
import { useRoomSeatPropsForm } from "./AdminRoomSeatPropsForm/useRoomSeatPropsForm"
// import { useRoomSeatsNumberForm } from "./AdminRoomSeatsNumberForm/useRoomSeatsNumberForm"

export type RoomForm = RoomAddForm

type AdminRoomSeatsSectionProps = {
  form: UseFormReturn<RoomForm>
}

export function AdminRoomSeatsSection({ form }: AdminRoomSeatsSectionProps) {
  const [columns, setColumns] = useState(0)
  const [selectedSeatIndexes, setSelectedSeatIndexes] = useState([] as number[])

  const { form: seatPropsForm } = useRoomSeatPropsForm()
  // const { form: seatsNumberForm } = useRoomSeatsNumberForm()
  
  useEffect(() => {
    if (form) {
      const columnSet = new Set()
      const rowSet = new Set()
      form.getValues().seats?.forEach(({ row, column }) => {
        rowSet.add(row)
        columnSet.add(column)
      })

      setColumns(columnSet.size)
      // seatsNumberForm.setValue('rows', rowSet.size)
      // seatsNumberForm.setValue('columns', columnSet.size)
    }

  }, [])

  function handleRemoveAllSelectedSeats() {
    selectedSeatIndexes.forEach(index => {
      (form.getValues().seats as RoomForm['seats'])[index].selected = false
      form.setValue('seats', form.getValues().seats)
    })

    seatPropsForm.setValue('exists', true)
    setSelectedSeatIndexes([])
  }

  return (
    <div className='mt-[2rem]'>
      <Label className={`text-base ${form.formState.errors?.seats && 'text-destructive'}`}>Formato da sala</Label>
      <div className='flex flex-wrap justify-between items-end gap-4' >
        <AdminRoomSeatsNumberForm
          setColumns={setColumns}
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
        columnsNumber={columns}
        setSelectedSeatIndexes={setSelectedSeatIndexes}
      />
    </div>
  )
}