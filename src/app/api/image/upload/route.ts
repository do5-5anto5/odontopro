import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET as string,
})

/**
 * Upload an image to Cloudinary and return the results.
 *
 * @param {Request} request - The request object.
 *
 * @returns {NextResponse} - The response object.
 *
 * @throws {NextResponse} - If no user or image is provided, or if the
 * image type is not supported, returns an error response with
 * status 400 or 401.
 *
 * @throws {NextResponse} - If an error occurs while uploading the image,
 * returns an error response with status 500.
 */
export const POST = async (request: Request) => {
  try {
    const formData = await request.formData()

    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    if (!userId || userId === '')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      return NextResponse.json(
        { error: 'Formato de imagem inválido.' },
        { status: 400 }
      )
    }

    const results = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: [`${userId}`],
            public_id: file.name,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            } else {
              resolve(result)
            }
          }
        )
        .end(buffer)
    })

    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.log('Upload error: ', error)
    return NextResponse.json(
      { error: 'Erro ao enviar imagem' },
      { status: 500 }
    )
  }
}
