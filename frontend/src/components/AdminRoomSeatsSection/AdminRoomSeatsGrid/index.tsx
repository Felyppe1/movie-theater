import { UseFormReturn } from "react-hook-form";
import { RoomForm } from "..";
import { Dispatch, SetStateAction } from "react";
import { useRoomSeatPropsForm } from "../AdminRoomSeatPropsForm/useRoomSeatPropsForm";

interface AdminRoomSeatsGridProps {
  roomForm: UseFormReturn<RoomForm>
  columnsNumber: number
  setSelectedSeatIndexes: Dispatch<SetStateAction<number[]>>
}

export function AdminRoomSeatsGrid({ roomForm, columnsNumber, setSelectedSeatIndexes }: AdminRoomSeatsGridProps) {
  const { form: seatPropsForm } = useRoomSeatPropsForm()
  roomForm.watch('seats')

  function handleSelectSeat(seat: RoomForm['seats'][number], seatIndex: number) {
    roomForm.setValue(`seats.${seatIndex}.selected`, !seat.selected)

    setSelectedSeatIndexes(state => {
      const newState = state.includes(seatIndex)
        ? state.filter(indx => indx != seatIndex)
        : [...state, seatIndex]
      
      if (newState.length > 0) {
        const areAllSeatsHidden = newState?.every(index => roomForm.getValues().seats![index].exists == false)
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
  }
  
  return (
    <div className='w-fit max-w-[50rem] overflow-hidden my-[1rem]'>
      <div className='grid gap-1' style={{ gridTemplateColumns: `${(columnsNumber > 0) ? `repeat(${columnsNumber}, 1fr)` : ''}` }}>
        {roomForm.getValues().seats?.map((seat, index) => {
          return (
            <button
              onClick={() => { handleSelectSeat(seat, index) }}
              key={`${seat.column}-${seat.row}`}
              className={`flex w-[1.5rem] aspect-square rounded-sm cursor-pointer
                ${seat.selected
                  ? 'bg-primary/60 hover:bg-primary/50' 
                  : seat.exists 
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-secondary hover:bg-secondary/70'}
                `}
            ></button>
          )
        })}
      </div>

      <div className='flex justify-center items-center h-[2rem] bg-primary radius text-primary-foreground mt-[2rem]'>
        {columnsNumber > 0 ? 'TELA' : '' }
      </div>
    </div>
  )
}