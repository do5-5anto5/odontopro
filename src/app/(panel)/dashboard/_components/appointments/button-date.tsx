'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

/**
 * Component to render a date input field to filter appointments by date.
 * It uses the `useRouter` hook to update the URL when the date changes.
 * The component will render a date input field with the current date selected.
 * When the user changes the date, the component will update the URL by setting a new search parameter.
 * The component will also re-render when the URL changes.
 *
 * @returns {JSX.Element} The rendered component
 */
export function ButtonDateAppointments() {
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  )

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value)

    const url = new URL(window.location.href)

    url.searchParams.set('date', event.target.value)
    router.push(url.toString())
  }

  return (
    <div>
      <input
        type="date"
        id="start"
        className="border-2 px-2 py-1 text-sm md:text-base"
        value={selectedDate}
        onChange={handleChangeDate}
      ></input>
    </div>
  )
}
