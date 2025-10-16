import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/schedule/get-appointments
 *
 * Retrieves all appointments for a given user on a given date.
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

    console.log('start date', startDate)
    console.log('end date', endDate)

    return NextResponse.json({
        ok: true
    })
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
