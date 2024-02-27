import { UseFormReturn } from "react-hook-form";
import { RoomForm } from "..";
import { Dispatch, SetStateAction } from "react";
import { useRoomSeatPropsForm } from "../AdminRoomSeatPropsForm/useRoomSeatPropsForm";

interface AdminRoomSeatsGridProps {
  roomForm: UseFormReturn<RoomForm>
  setSelectedSeatIndexes: Dispatch<SetStateAction<string[]>>
}

export function AdminRoomSeatsGrid({ roomForm, setSelectedSeatIndexes }: AdminRoomSeatsGridProps) {
  const { form: seatPropsForm } = useRoomSeatPropsForm()
  roomForm.watch('seats')

  function handleSelectSeat(seat: RoomForm['seats'][number][number], colIndex: number, rowIndex: number) {
    roomForm.setValue(`seats.${colIndex}.${rowIndex}.selected`, !seat.selected)

    const seatId = String(colIndex) + String(rowIndex)

    setSelectedSeatIndexes(state => {
      const newState = state.includes(seatId)
        ? state.filter(indx => indx != seatId)
        : [...state, seatId]
      
      if (newState.length > 0) {
        const areAllSeatsHidden = newState?.every(() => roomForm.getValues().seats![colIndex][rowIndex].exists == false)
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
    <>
    <div>
      <div>
        {roomForm.getValues().seats?.map((seatsRow, colIndex) => (
          <div className='flex gap-[.125rem]'>
            {seatsRow.map((seat, rowIndex) => (
              <button
                key={`${colIndex}${rowIndex}`}
                onClick={() => handleSelectSeat(seat, colIndex, rowIndex)}
                className={`w-full max-w-[1.5rem] aspect-square mt-[.125rem] rounded-sm cursor-pointer
                  ${seat.selected
                    ? 'bg-primary/60 hover:bg-primary/50' 
                    : seat.exists 
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-secondary hover:bg-secondary/70'}
                  `}
              ></button>
            ))}
          </div>
        ))}
      </div>

      {roomForm.getValues().seats?.[0]?.length > 0 && (
        <div className='flex justify-center items-center h-[1.75rem] bg-primary radius text-primary-foreground mt-[2rem]'>
          TELA
        </div>
      )}
    </div>
    </>
  )
}