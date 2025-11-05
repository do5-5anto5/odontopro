import Link from 'next/link'

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A component to display a label indicating that the user's subscription has expired
 * or that the user has exceeded the limit of services for their plan.
 */
/*******  fc17cc43-dfc7-4574-a042-98aa41e9773f  *******/
export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div
      className="bg-red-400 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md 
      flex flex-col md:flex-row md:items-center justify-between gap-1"
    >
      <div>
        {expired ? (
          <h3 className="font-semibold">
            Seu plano expirou ou você não possui plano ativo!
          </h3>
        ) : (
          <h3 className="font-semibold">
            Você excedeu o limite de serviços do seu plano!
          </h3>
        )}
        <p className="text-sm text-gray-100">
          Acesse seu plano para verificar os detalhes.
        </p>
      </div>

      <Link
        href="/dashboard/plans"
        className="bg-zinc-900 text-white px-3 py-1 rounded-md w-fit h-fit mt-2 md:mt-0"
      >
        {' '}
        Acessar Planos
      </Link>
    </div>
  )
}
