'use client'

import { Button } from '@/components/ui/button'
import { TimeSlot } from './schedule-content'
import { cn } from '@/lib/utils'
import { isToday, isSlotInThePast } from './schedule-utils'

interface ScheduleTimesListProps {
  selectedDate: Date
  selectedTime: string
  requiredSlots: number
  blockedTimes: string[]
  availableTimeSlots: TimeSlot[]
  clinicTimes: string[]
  onSelectTime: (time: string) => void
}

/**
 * Render a list of available time slots for a given date and clinic.
 *
 * @param {ScheduleTimesListProps} props - Component props
 * @param {Date} props.selectedDate - The selected date
 * @param {string} props.selectedTime - The selected time
 * @param {number} props.requiredSlots - The required number of slots for the appointment
 * @param {string[]} props.blockedTimes - The blocked times for the appointment
 * @param {TimeSlot[]} props.availableTimeSlots - The available time slots for the appointment
 * @param {string[]} props.clinicTimes - The time slots available for the clinic
 * @param {(time: string) => void} props.onSelectTime - The function to be called when a time slot is selected
 * @returns {JSX.Element} - The rendered component
 */

export function ScheduleTimesList({
  selectedDate,
  selectedTime,
  requiredSlots,
  blockedTimes,
  availableTimeSlots,
  clinicTimes,
  onSelectTime,
}: ScheduleTimesListProps) {

  const dateIsToday = isToday(selectedDate)
  
  return (
    <div className="grid grid-cols-3  md:grid-cols-5 gap-2">
      {availableTimeSlots.map((slot) => {
        const slotIsPast = dateIsToday && isSlotInThePast(slot.time)
        
        return (
          <Button
          onClick={() => onSelectTime(slot.time)}
            type="button"
            variant="outline"
            key={slot.time}
            className={cn(
              'h-10 select-none',
              selectedTime === slot.time &&
                'border-2 border-emerald-500 text-primary'
            )}
            disabled={slotIsPast}
          >
            {slot.time}
          </Button>
        )
      })}
    </div>
  )
}
