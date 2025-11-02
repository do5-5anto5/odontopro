'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { Plan } from '@/generated/prisma/client'

interface SubscriptionProps {
  type: Plan
}


/**
 * Create a Stripe checkout session for a subscription.
 *
 * @param {SubscriptionProps} props - Subscription type.
 * @returns {Promise<{ error: string, sessionId: string, url: string }>} - Checkout session data.
 * @throws {Error} - If there is an error creating the checkout session.
 */
export async function createSubscription({ type }: SubscriptionProps) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return { error: 'Falha ao ativar plano', sessionId: '' }

  const findUser = await prisma.user.findFirst({
    where: { id: userId },
  })

  if (!findUser) return { error: 'Usuário não encontrado', sessionId: '' }

  const customerId = findUser.stripe_customer_id

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email!,
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        stripe_customer_id: stripeCustomer.id,
      },
    })
  }

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId!,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price:
            type === 'BASIC'
              ? process.env.STRIPE_PLAN_BASIC
              : process.env.STRIPE_PLAN_PROFESSIONAL,
          quantity: 1,
        },
      ],
      metadata: {
        type: type,
      },
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return {
      sessionId: stripeCheckoutSession.id,
      url: stripeCheckoutSession.url,
    }
  } catch (error) {
    console.log(error)
    return { error: 'Falha ao criar checkout', sessionId: '' }
  }
}
