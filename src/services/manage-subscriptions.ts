import prisma from '@/lib/prisma'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { Plan } from '@/generated/prisma/client'

/**
 * CRUD function to manage a subscription at database,
 * sinchronizing with Stripe
 */
export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  type?: Plan
) {
  const findUser = await prisma.user.findFirst({
    where: {
      stripe_customer_id: customerId,
    },
  })

  if (!findUser) {
    return Response.json(
      {
        error: 'Usuário nao encontrado',
      },
      { status: 400 }
    )
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscriptionId,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? 'BASIC',
  }

  if (subscriptionId && deleteAction) {
    try {
      await prisma.subscription.delete({
        where: {
          id: subscriptionId,
        },
      })
      return
    } catch (error) {
      console.log('Error deleting subscription')
      console.log(error)
      return
    }
  }

  if (createAction) {
    try {
      await prisma.subscription.create({
        data: subscriptionData,
      })
    } catch (error) {
      console.log('Error creating subscription')
      console.log(error)
    }
  } else {
    try {
      const findSubscription = await prisma.subscription.findFirst({
        where: {
          id: subscriptionId,
        },
      })

      if (!findSubscription) return

      await prisma.subscription.update({
        where: {
          id: findSubscription.id,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
          plan: type ?? 'BASIC',
        },
      })
    } catch (error) {
      console.log('Error updating subscription')
      console.log(error)
    }
  }
}
