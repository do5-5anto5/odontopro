'use server'

import prisma from '@/lib/prisma'
import { addDays, differenceInDays, isAfter } from 'date-fns'
import { TRIAL_DAYS } from './trial-limits'

/**
 * Checks the user's subscription status and returns an object with
 * the subscription status, a message and the plan ID.
 */
export async function checkSubscription(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (user.subscription && user.subscription.status === 'active') {
    return {
      subscriptionStatus: 'active',
      message: 'Plano ativo',
      planId: user.subscription.plan,
    }
  }

  const trialEndDate = addDays(user.createdAt, TRIAL_DAYS)

  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: 'EXPIRED',
      message: 'Seu período de teste expirou.',
      planId: 'TRIAL',
    }
  }

  const trialDaysRemaining = differenceInDays(trialEndDate, new Date())

  return {
    subscriptionStatus: 'TRIAL',
    message: `Você está no periodo de teste gratuito. Encerramento em ${trialDaysRemaining} dias.`,
    planId: 'TRIAL',
  }
}
