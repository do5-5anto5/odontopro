'use client'

import { Subscription } from '@/generated/prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { subscriptionPlans } from '@/utils/plans'
import { Button } from '@/components/ui/button'
import { createPortalCustomer } from '../_actions/create-portal-customer'
import { toast } from 'sonner'

interface SubscriptionDetailsProps {
  subscription: Subscription
}

export function SubscriptionDetails({
  subscription,
}: SubscriptionDetailsProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan
  )

  async function handleManageSubscription() {
    const portal = await createPortalCustomer()

    if (portal.error) {
      toast.error('Ocorreu um erro ao criar o portal de assinatura')
      return
    }

    window.location.href = portal.sessionId!
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Seu Plano Atual</CardTitle>
        <CardDescription>Assinatura ativa</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg md:text-xl">
            {subscription.plan === 'BASIC' ? 'BASIC' : 'PROFISSIONAL'}
          </h3>

          <div className="bg-emerald-500 text-white w-fit py-1 px-4 rounded-md">
            {subscription.status === 'active' ? 'ATIVO' : 'INATIVO'}
          </div>
        </div>

        <ul className="list-disc list-inside space-y-2">
          {subscriptionInfo &&
            subscriptionInfo.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button onClick={handleManageSubscription}>Gerenciar assinatura</Button>
      </CardFooter>
    </Card>
  )
}
