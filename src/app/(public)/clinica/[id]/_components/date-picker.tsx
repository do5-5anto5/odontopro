'use client'

import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ptBR } from 'date-fns/locale/pt-BR'

registerLocale('pt-BR', ptBR)

interface DateTimePickerProps {
  minDate?: Date
  initialDate?: Date
  className?: string
  onChange: (date: Date) => void
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Render a DatePicker component with locale pt-BR.
 *
 * @param {string} className - CSS class to be applied.
 * @param {Date} initialDate - Initial date to be displayed.
 * @param {Date} minDate - Minimum selectable date.
 * @param {function} onChange - Callback function to handle date changes.
 */
export function DateTimePicker({
  className,
  initialDate,
  minDate,
  onChange,
}: DateTimePickerProps) {
  const [startDate, setStartDate] = useState(initialDate || new Date())

  function handleChange(date: Date | null) {
    if (date) {
      const correctedDate = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          12, 
          0,
          0,
          0
        )
      )
      
      console.log('Data selecionada (corrigida):', correctedDate)
      console.log('Data ISO:', correctedDate.toISOString())
      console.log('Data local:', correctedDate.toLocaleDateString('pt-BR'))
      
      console.log(date)
      setStartDate(correctedDate)
      onChange(date)
    }
  }

  return (
    <DatePicker
      className={className}
      selected={startDate}
      locale="pt-BR"
      minDate={minDate ?? new Date()}
      onChange={handleChange}
      dateFormat={'dd/MM/yyyy'}
    />
  )
}
