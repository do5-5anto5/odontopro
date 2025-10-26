'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Prisma } from '@/generated/prisma'
import CircularLoading from '@/components/ui/circular-loading'
import { Button } from '@/components/ui/button'
import { Eye, X } from 'lucide-react'
import { cancelAppointment } from '../../_actions/cancel-appointment'
import { toast } from 'sonner'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DialogAppointment } from './dialog-appointment'
import { useLoading } from '@/utils/loading'
import { ButtonDateAppointments } from './button-date'

interface AppointmentsListProps {
  times: string[]
}

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
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
  const queryClient = useQueryClient()

  const { loading: actionLoading, withLoading: withActionLoading } =
    useLoading()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentWithService | null>(null)

  const {
    data: appointments,
    isLoading: fetchloading,
    refetch,
  } = useQuery({
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
    // 20secs
    staleTime: 20000,
    refetchInterval: 30000,
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

  async function handleCancelAppointment(appointmentId: string) {
    withActionLoading(async () => {
      const response = await cancelAppointment({ appointmentId: appointmentId })

      if (response.error) {
        toast.error(response.error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['get-appointments'] })
      await refetch()
      toast.success(response.data)
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader
          className="flex flex-row items-center justify-between
            space-y-0 pb-2"
        >
          <CardTitle className="text-xl md:text-2xl font bold">
            Agendamentos
          </CardTitle>

          <ButtonDateAppointments />

          {actionLoading ? <CircularLoading noBorder={true} /> : ''}
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
            {fetchloading ? (
              <div className="flex flex-row items-center">
                <p className="text-lg mr-2">Carregando agenda</p>
                <CircularLoading noBorder={true} />
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

                      <div className="ml-auto">
                        <div className="flex">
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => setDetailAppointment(occupant)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>

                          <Button
                            variant="ghost"
                            onClick={() => handleCancelAppointment(occupant.id)}
                            disabled={fetchloading || actionLoading}
                          >
                            <X className="w-4 h-4" />
                          </Button>
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

      <DialogAppointment appointment={detailAppointment} />
    </Dialog>
  )
}
