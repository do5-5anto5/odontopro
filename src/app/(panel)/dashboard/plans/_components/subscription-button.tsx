'use cliente'

import { Button } from '@/components/ui/button'
import { Plan } from '@/generated/prisma/client'
import { createSubscription } from '../_actions/create-subscription'
import { toast } from 'sonner'
import {getStripeJs} from '@/lib/stripe-js'

interface SubscriptionButtonProps {
  type: Plan
}

/**
 * Component to render a button to create a billing subscription on Stripe.
 * It receives a type of plan (BASIC or PROFESSIONAL) and calls the createSubscription function.
 * It also uses the getStripeJs util to get the Stripe JS library.
 * If the url is provided, it redirects the user to the Stripe checkout page.
 * If there is an error, it toasts the error.
 *
 * @param {Plan} type - The type of plan (BASIC or PROFESSIONAL).
 *
 * @returns {JSX.Element} The rendered component.
 */

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const { url, error } = await createSubscription({ type: type })

    if (error) {
      toast.error(error)
      return
    }

      const stripe = await getStripeJs()
    
    if (stripe && url) {
      window.location.href = url 
    }
  }

  return (
    <Button
      className={`w-full ${
        type === 'PROFESSIONAL' && 'bg-emerald-500 hover:bg-emerald-400'
      }`}
      onClick={handleCreateBilling}
    >
      Ativar Assinatura
    </Button>
  )
}
