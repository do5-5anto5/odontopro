'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reminder } from '@/generated/prisma'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Plus, Trash } from 'lucide-react'
import { deleteReminder } from '../../_actions/delete-reminder'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReminderContent } from './reminder-content'

interface ReminderListProps {
  reminders: Reminder[]
}

/**
 * Render a list of reminders.
 *
 * @param {ReminderListProps} props - Reminder list props.
 * @param {Reminder[]} props.reminders - List of reminders.
 * @returns {React.ReactElement} - Reminder list component.
 */
export function ReminderList({ reminders }: ReminderListProps) {
  const router = useRouter()

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id })

    if (response.error) {
      toast(response.error)
      return
    }

    toast.success(response.data)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-9 px-0">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Lembrete</DialogTitle>

                <DialogDescription>Adicionar Detalhes:</DialogDescription>
              </DialogHeader>

              <ReminderContent />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {reminders.length === 0 && (
            <p className="text-sm md:text-base text-gray-500">
              Nenhum lembrete encontrado
            </p>
          )}

          <ScrollArea
            className="max-h-[340px] lg:max-h[calc(100vh-15rem)]
          pr-0 w-full flex-1"
          >
            {reminders.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap flex-row items-center justify-between p-2 
              bg-yellow-100 rounded-md"
              >
                <p className="text-sm md:text-base">{item.description}</p>

                <Button
                  className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-2 w-8 h-8"
                  onClick={() => handleDeleteReminder(item.id)}
                >
                  <Trash className="w-4 h-4 text-white" />
                </Button>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
