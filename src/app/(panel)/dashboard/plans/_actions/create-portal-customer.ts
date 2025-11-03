'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

/**
 * Creates a Stripe billing portal session for the user.
 *
 * @returns {object} - Object containing the error and sessionId.
 * @throws {Error} - If there is an error creating the portal session.
 */
export async function createPortalCustomer() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found',
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  })

  if (!user) {
    return {
      error: 'User not found',
      sessionId: '',
    }
  }

  const sessionId = user.stripe_customer_id

  if (!sessionId) {
    return {
      error: 'User not found',
      sessionId: '',
    }
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL as string,
    })

    return {
      sessionId: portalSession.url,
    }
  } catch (error) {
    console.log('ERROR CREATING PORTAL', error)
    return {
      error: 'Error creating portal session',
      sessionId: '',
    }
  }
}
