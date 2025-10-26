import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/schedule/get-appointments
 *
 * Retrieves all appointments for a given user on a given date.
 *
 * @description Returns blocked hours for appointments
 *
 * @param {NextRequest} request - The request object.
 *
 * @returns {NextResponse} - The response object.
 *
 * @throws {NextResponse} - If no user or date is provided, returns an error response with status 400.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const userId = searchParams.get('userId')
  const dateParam = searchParams.get('date')

  if (!userId || userId === 'null' || !dateParam || dateParam === 'null') {
    return NextResponse.json(
      {
        error: 'Nenhum agendamento encontrado',
      },
      {
        status: 400,
      }
    )
  }

  try {
    const [year, month, day] = dateParam.split('-').map(Number)
    const startDate = new Date(year, month - 1, day, 0, 0, 0)
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999)

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: 'Não há clínica com Id correspondente',
        },
        {
          status: 400,
        }
      )
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    })

    const blockedSlots = new Set<string>()

    for (const apt of appointments) {
      const requiredSlots = Math.ceil(apt.service.duration / 30)
      const startIndex = user.times.indexOf(apt.time)

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const blockedSlot = user.times[startIndex + i]
          if (blockedSlot) {
            blockedSlots.add(blockedSlot)
          }
        }
      }
    }

    const blockedTimes = Array.from(blockedSlots)

    return NextResponse.json(blockedTimes)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: 'Nenhum agendamento encontrado',
      },
      {
        status: 400,
      }
    )
  }
}
