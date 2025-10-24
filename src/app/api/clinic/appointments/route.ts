import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const dateString = searchParams.get('date') as string
  const clinicId = request.auth?.user?.id

  if (!dateString) {
    return NextResponse.json({ error: 'Data não informada' }, { status: 400 })
  }

  if (!clinicId) {
    return NextResponse.json(
      { error: 'Clinica não encontrada' },
      { status: 400 }
    )
  }

  try {
    const [year, month, day] = dateString.split('-').map(Number)

    const startDate = new Date(year, month - 1, day, 0, 0, 0, 0)
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999)

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Falha ao buscar agendamentos' },
      { status: 500 }
    )
  }
})
