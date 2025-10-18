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

/**
 * Checks if a given sequence of time slots is available.
 *
 * @param {string} startSlot - The starting time slot of the sequence
 * @param {number} requiredSlots - The number of time slots required
 * @param {string[]} allSlots - All available time slots
 * @param {string[]} blockedSlots - Time slots that are not available
 * @returns {boolean} - true if the sequence is available, false otherwise
 */
export function isSlotSequenceAvailable(
  startSlot: string,
  requiredSlots: number,
  allSlots: string[],
  blockedSlots: string[]
) {
  const startIndex = allSlots.indexOf(startSlot)
  if (startIndex === -1 || startIndex + requiredSlots > allSlots.length) {
    return false
  }

  for (let i = startIndex; i < startIndex + requiredSlots; i++) {
    const slotTime = allSlots[i]

    if (blockedSlots.includes(slotTime)) return false
  }

  return true
}
