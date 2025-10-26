import { redirect } from 'next/navigation'
import { getInfoSchedule } from './_data-access/get-info-schedule'
import { ScheduleContent } from './_components/schedule-content'

/**
 * checks existing clinic profile then returns ScheduleContent or redirect to home page
 * @param param0
 */
export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const userId = (await params).id

  const user = await getInfoSchedule({ userId })

  if (!user) redirect('/')

  return <ScheduleContent clinic={user} />
}
