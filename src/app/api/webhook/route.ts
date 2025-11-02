import { Plan } from '@/generated/prisma/client'
import { stripe } from '@/lib/stripe'
import { manageSubscription } from '@/services/manage-subscriptions'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

/**
 * Handles a Stripe webhook request.
 *
 * @param {Request} request - The incoming Next.js API route request.
 *
 * @returns {Promise<NextResponse>} - A NextResponse object indicating the result of the webhook request.
 *
 * Webhook events handled by this function are:
 * - customer.subscription.deleted
 * - customer.subscription.updated
 * - checkout.session.completed
 *
 * In case of an unhandled event type, this function will log a message to the console.
 */
export const POST = async (request: Request) => {
  const signature = request.headers.get('stripe-signature')

  if (!signature) return NextResponse.error()

  console.log('STARTING WEBHOOK')

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK as string
  )

  switch (event.type) {
    case 'customer.subscription.deleted':
      const payment = event.data.object as Stripe.Subscription

      console.log('subscription deleted', payment)

      await manageSubscription(
        payment.id,
        payment.customer.toString(),
        false,
        true
      )

      break

    case 'customer.subscription.updated':
      const paymentIntent = event.data.object as Stripe.Subscription

      console.log('subscription updated', paymentIntent)

      await manageSubscription(
        paymentIntent.id,
        paymentIntent.customer.toString(),
        false
      )

      break

    case 'checkout.session.completed':
      const checkoutSession = event.data.object as Stripe.Checkout.Session

      const type = checkoutSession?.metadata?.type
        ? checkoutSession?.metadata?.type
        : 'BASIC'

      console.log('subscription created', checkoutSession)

      if (checkoutSession.subscription && checkoutSession.customer) {
        await manageSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true,
          false,
          type as Plan
        )
      }

      break

    default:
      console.log('Unhandled event type: ', event.type)
  }

  revalidatePath('/dashboard/plans')

  return NextResponse.json({ received: true })
}
