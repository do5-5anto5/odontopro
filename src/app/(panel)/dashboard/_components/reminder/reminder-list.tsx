'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reminder } from '@/generated/prisma'
import { Plus, Trash } from 'lucide-react'

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
  console.log(reminders)

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Button variant="ghost" className="w-9 p-0">
            <Plus className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>
          {reminders.length === 0 && (
            <p className="text-sm md:text-base text-gray-500">Nenhum lembrete encontrado</p>
          )}
          {reminders.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap flex-row items-center justify-between p-2 
              bg-yellow-100 rounded-md"
            >
              <p className="text-sm md:text-base">{item.description}</p>

              <Button className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-2 w-8 h-8 ">
                <Trash className="w-4 h-4 text-white" />
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
