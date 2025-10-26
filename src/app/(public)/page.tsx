import { Footer } from './_components/footer'
import Header from './_components/header'
import Hero from './_components/hero'
import { Professionals } from './_components/professionals'
import { getProfessionals } from './_data-access/get-professionals'

export const revalidate = 120

export default async function Home() {
  const professinals = await getProfessionals()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />

        <Professionals professionals={professinals} />

        <Footer />
      </div>
    </div>
  )
}
