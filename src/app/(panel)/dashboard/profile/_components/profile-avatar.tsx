'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import noPhoto from '../../../../../../public/foto1.png'
import { Loader, Upload } from 'lucide-react'
import { useLoading } from '@/utils/loading'
import { toast } from 'sonner'
import { updateProfileAvatar } from '../_actions/update-profile-avatar'
import { useSession } from 'next-auth/react'

interface AvatarProfileProps {
  avatarUrl: string | null
  userId: string
}

export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl)
  const { loading, withLoading } = useLoading()

  const { update } = useSession()

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    withLoading(async () => {
      if (event.target.files && event.target.files[0]) {
        const image = event.target.files[0]

        if (image.type !== 'image/jpeg' && image.type !== 'image.png') {
          toast.error('Formato de imagem inválido.')
          return
        }

        const newFilename = `${userId}`
        const newFile = new File([image], newFilename, { type: image.type })

        const urlImage = await uploadImage(newFile)

        if (!urlImage || urlImage === '') {
          toast.error('Falha ao alterar imagem')
          return
        }

        setPreviewImage(urlImage)

        await updateProfileAvatar({ avatarUrl: urlImage })

        await update({
          image: urlImage,
        })
      }
    })
  }

  async function uploadImage(image: File): Promise<string | null> {
    try {
      toast('Enviando sua imagem...')

      const formData = new FormData()

      formData.append('file', image)
      formData.append('userId', userId)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        return null
      }

      toast('Imagem alterada com sucesso!')

      return data.secure_url as string
    } catch (error) {
      console.log(error)
      return null
    }
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
