import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { ServicesContent } from './_components/services-content'

export default async function Services() {
  const session = await getSession()

  if (!session || !session.user) redirect('/')

  return (
    <section>
      <ServicesContent userId={session.user?.id} />
    </section>
  )
}
