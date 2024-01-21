import { UseFormReturn } from "react-hook-form";
import { AddRoomForm, SeatProps } from "../../useAdminRoomViewForm";

interface AdminRoomSeatsGridProps {
  addRoomForm: UseFormReturn<AddRoomForm>
  columnsNumber: number
  handleSelectSeat: (seat: SeatProps, seatIndex: number) => void
}

export function AdminRoomSeatsGrid({ addRoomForm, columnsNumber, handleSelectSeat }: AdminRoomSeatsGridProps) {
  return (
    <div className='w-fit max-w-[50rem] overflow-hidden my-[1rem]'>
      <div className='grid gap-1' style={{ gridTemplateColumns: `${(columnsNumber > 0) ? `repeat(${columnsNumber}, 1fr)` : ''}` }}>
        {addRoomForm.getValues().seats?.map((seat, index) => {
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