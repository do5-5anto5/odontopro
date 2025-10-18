/**
 * Checks if a given date is today.
 *
 * @param {Date} date - The date to be checked
 * @returns {boolean} - true if the date is today, false otherwise
 */
export function isToday(date: Date) {
    const now = new Date()

    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    )
}

/**
 * Checks if a given time slot is in the past.
 *
 * @param {string} slotTime - The time slot to be checked, in the format "HH:mm"
 * @returns {boolean} - true if the time slot is in the past, false otherwise
 */
export function isSlotInThePast(slotTime: string) {
  const [slotHour, slotMinute] = slotTime.split(':').map(Number)

  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  if (slotHour < currentHour) {
    return true
  } else if (slotHour === currentHour && slotMinute <= currentMinute) {
    return true
  }

  return false
}
