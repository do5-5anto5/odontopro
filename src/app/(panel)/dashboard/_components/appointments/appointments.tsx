'use server'

import { getTimesClinic } from '../../_data-access/get-times-clinic'
import { AppointmentsList } from './appointments-list'

/**
 * Component to display the list of available times for a given user.
 *
 * @param {string} userId - The user id.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export default async function Appointments({ userId }: { userId: string }) {
  const { times } = await getTimesClinic({ userId: userId })

  return (
    <div>
      <AppointmentsList times={times} />
    </div>
  )
}
