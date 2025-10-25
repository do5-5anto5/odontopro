'use client'

import { useSearchParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Prisma } from '@/generated/prisma'
import CircularLoading from '@/components/ui/circular-loading'

interface AppointmentsListProps {
  times: string[]
}

type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true
  }
}>

/**
 * Render a list of available time slots for a given date and clinic.
 *
 * @param {AppointmentsListProps} props - Component props
 * @param {string[]} props.times - List of available time slots for the appointment
 * @returns {JSX.Element} - The rendered component
 */
export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams()
  const date = searchParams.get('date')

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd')
        activeDate = today
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`

      const response = await fetch(url)

      const json = await response.json()

      console.log(activeDate, ' ', json)

      if (!response.ok) return []

      return json.appointments as AppointmentWithService[]
    },
  })

  const occupantMap: Record<string, AppointmentWithService> = {}

  if (appointments && appointments.length > 0) {
    for (const appointment of appointments) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30)

      const startIndex = times.indexOf(appointment.time)

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment
          }
        }
      }
    }
  }

  return (
    <div>
      <Card>
        <CardHeader
          className="flex flex-row items-center justify-between
            space-y-0 pb-2"
        >
          <CardTitle className="text-xl md:text-2xl font bold"></CardTitle>
          <button>SELECIONAR DATA</button>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
            {isLoading ? (
              <div className='flex flex-row items-center'>
                <p className="text-lg mr-2">Carregando agenda</p>
                <CircularLoading borderColor="emerald-800" />
              </div>
            ) : (
              times.map((slot) => {
                const occupant = occupantMap[slot]

                if (occupant) {
                  return (
                    <div
                      key={slot}
                      className="flex items-center py-2 border-t last:border-b"
                    >
                      <div className="w-16">{slot}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{occupant.name}</div>
                        <div className="text-sm text-gray-500">
                          {occupant.phone}
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={slot}
                      className="flex items-center py-2 border-t last:border-b"
                    >
                      <div className="w-16 text-sm font-semibold">{slot}</div>
                      <div className="flex-1 text-sm">Disponível</div>
                    </div>
                  )
                }
              })
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
