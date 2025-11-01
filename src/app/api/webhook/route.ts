import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/utils/stripe/stripe'

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

    console.log('🔑 Webhook secret:', process.env.STRIPE_WEBHOOK_SECRET_KEY ? 'EXISTS ✅' : 'MISSING ❌')
  
    
  const signature = request.headers.get('stripe-signature')

  if (!signature) return NextResponse.error()

  console.log('STARTING WEBHOOK')

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  )

  switch (event.type) {
    case 'customer.subscription.deleted':
      const payment = event.data.object as Stripe.Subscription

      console.log('subscription deleted', payment)

      //TODO delete subscrition at database
      break
    case 'customer.subscription.updated':
      const paymentIntent = event.data.object as Stripe.Subscription

      console.log('subscription updated', paymentIntent)

      //TODO update subscrition at database
      break
    case 'checkout.session.completed':
      const checkoutSession = event.data.object as Stripe.Checkout.Session

      console.log('subscription created', checkoutSession)

      //TODO create new active subscription to user
      break

    default:
      console.log('Unhandled event type: ', event.type)
  }

  return NextResponse.json({ received: true })
}
