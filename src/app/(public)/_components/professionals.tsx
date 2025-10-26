import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import photoImg from '../../../../public/foto1.png'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { User } from '@/generated/prisma/client'

interface ProfessionalsProps {
  professionals: User[]
}

export function Professionals({ professionals }: ProfessionalsProps) {
  console.log('profs', professionals)

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clínicas Disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((clinic) => (
            <Card className="overflow-hidden p-0 hover:shadow-2xl" key={clinic.id}>
              <CardContent className="p-0">
                <div>
                  <div className="relative h-48">
                    <Image
                      src={clinic.image || photoImg}
                      alt="Imagem de perfil da clínica"
                      fill
                      className="object-cover"
                    ></Image>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <p className="text-sm text-gray-500">
                        {clinic.adress ?? 'Endereço não informado'}
                      </p>
                    </div>

                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  </div>

                  <Link
                    href={`/clinica/${clinic.id}`}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white 
                      flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium"
                    target='_blank'
                  >
                    <ArrowRight />
                    Agendar horário
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  )
}
