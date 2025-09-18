import { v2 as cloudinary } from 'cloudinary'
import { envConfig } from '../config/env'

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET
})

export const uploadBase64File = async (base64File: string, folder: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64File, {
      folder: folder,
      resource_type: 'auto'
    })

    return {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

export default cloudinary
