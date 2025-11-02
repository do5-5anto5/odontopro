import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { GridPlans } from './_components/grid-subscription'
import { getSubscription } from './_data-acess/get-subscriptions'
import { SubscriptionDetails } from './_components/subscription-card'

export default async function Plan() {
  const session = await getSession()

  if (!session) redirect('/')

  const subscription = await getSubscription({ userId: session?.user?.id })

  console.log('sub', subscription)

  return (
    <div>
      {subscription?.status !== 'active' && <GridPlans />}
      {subscription?.status === 'active' && <SubscriptionDetails subscription={subscription!}/>}
    </div>
  )
}
