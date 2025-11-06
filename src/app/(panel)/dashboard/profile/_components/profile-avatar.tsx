'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import noPhoto from '../../../../../../public/foto1.png'
import { Loader, Upload } from 'lucide-react'
import { useLoading } from '@/utils/loading'
import { toast } from 'sonner'

interface AvatarProfileProps {
  avatarUrl: string | null
  userId: string
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Componente que renderiza um avatar com a opção de upload de imagem
 * 
 * @param {AvatarProfileProps} props - Props do componente
 * @param {string | null} props.avatarUrl - URL da imagem do avatar
 * @param {string} props.userId - ID do usuário
 * 
 * @returns {JSX.Element} - Elemento JSX do componente
 */
/*******  d83edfb1-e899-4d4e-bf4d-f513a72a1429  *******/
export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl)

  const { loading, withLoading } = useLoading()

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    withLoading(async () => {
      if (event.target.files && event.target.files[0]) {
        const image = event.target.files[0]

        if (image.type !== 'image/jpeg' && image.type !== 'image.png') {
            toast.error('Formato de imagem inválido.') 
            return
        }
      }

      //TODO integrar com o bano de dados
    })
  }

  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48">
      <div className="relative flex items-center justify-center w-full h-full">
        <span
          className="absolute cursor-pointer
          z-[2] bg-slate-50/35 p-2 rounded-full shadow-xl"
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <Upload size={16} color="#131313" />
          )}
        </span>

        <input
          type="file"
          className="cursor-pointer relative z-50 w-48 h-48 opacity-0"
          onChange={handleChange}
        />
      </div>

      <Image
        src={previewImage || noPhoto}
        alt="Foto de perfil da clínica"
        fill
        className="w-full h-48 object-cover bg-slate-200 rounded-full"
        quality={100}
        priority
        sizes="(max-widht: 480px) 100vw, (max-width: 1024px) 75vw, 60 vw"
      />
    </div>
  )
}
