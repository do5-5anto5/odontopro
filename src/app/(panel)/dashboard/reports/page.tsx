import { redirect } from 'next/navigation'
import { getProfessionalPermission } from '../../../../services/permissions/get-professional-permission'
import getSession from '@/lib/getSession'

export default async function Reports() {
  const session = await getSession()

  if (!session) {
    redirect('/')
  }

  const user = await getProfessionalPermission({ userId: session.user?.id })

  if (!user) {
    return (
      <main>
        <h1>Você não tem permissão para acessar essa página</h1>
        <p>Assine o plano Profissional para ter acesso completo!</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Relatórios</h1>
    </main>
  )
}
