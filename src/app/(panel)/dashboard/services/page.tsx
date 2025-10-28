import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { ServicesContent } from './_components/services-content'
import { Suspense } from 'react'
import CircularLoading from '@/components/ui/circular-loading'

export default async function Services() {
  const session = await getSession()

  if (!session || !session.user) redirect('/')

  return (
    <Suspense
      fallback={
        <div>
          Carregando... <CircularLoading noBorder={true} />
        </div>
      }
    >
      <ServicesContent userId={session.user?.id} />
    </Suspense>
  )
}
