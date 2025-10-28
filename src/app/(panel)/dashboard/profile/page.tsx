import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { getUserData } from './_data-access/get-user-info'
import { ProfileContent } from './_components/profile'
import { Suspense } from 'react'
import CircularLoading from '@/components/ui/circular-loading'

export default async function Profile() {
  const session = await getSession()

  if (!session) redirect('/')

  const user = await getUserData({ userId: session.user?.id })

  if (!user) redirect('/')

  return (
    <Suspense fallback={<CircularLoading noBorder={true} />}>
      <ProfileContent user={user} />
    </Suspense>
  )
}
