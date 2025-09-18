/**
 * Environment Configuration and Validation
 * Centralizes all environment variable handling and validation
 */

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

interface EnvConfig {
  // Server
  PORT: number
  NODE_ENV: string

  // Database
  DATABASE_URL: string

  // SMTP Configuration
  SMTP_HOST: string
  SMTP_PORT: number
  SMTP_SECURE: boolean
  SMTP_USER: string
  SMTP_PASS: string
  SMTP_FROM: string

  // Email Recipients
  ANFRAGE_RECIPIENT_EMAIL: string
  SCHADEN_RECIPIENT_EMAIL: string

  // Cloudinary Configuration
  CLOUDINARY_CLOUD_NAME: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
}

/**
 * Validates and returns environment configuration
 */
export function getEnvConfig(): EnvConfig {
  const requiredVars = [
    'DATABASE_URL',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'ANFRAGE_RECIPIENT_EMAIL',
    'SCHADEN_RECIPIENT_EMAIL',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:')
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`)
    })
    console.error('\n📝 Please check your server/.env file and ensure all required variables are set.')
    console.error('📋 Required variables:')
    requiredVars.forEach(varName => {
      console.error(`   - ${varName}`)
    })
    process.exit(1)
  }

  // Validate specific formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(process.env.SMTP_FROM!)) {
    console.error('❌ SMTP_FROM must be a valid email address')
    process.exit(1)
  }

  if (!emailRegex.test(process.env.ANFRAGE_RECIPIENT_EMAIL!)) {
    console.error('❌ ANFRAGE_RECIPIENT_EMAIL must be a valid email address')
    process.exit(1)
  }

  if (!emailRegex.test(process.env.SCHADEN_RECIPIENT_EMAIL!)) {
    console.error('❌ SCHADEN_RECIPIENT_EMAIL must be a valid email address')
    process.exit(1)
  }

  const port = parseInt(process.env.SMTP_PORT!)
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error('❌ SMTP_PORT must be a valid port number (1-65535)')
    process.exit(1)
  }

  console.log('✅ All environment variables validated successfully')

  return {
    PORT: parseInt(process.env.PORT || '5000'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL!,
    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: port,
    SMTP_SECURE: process.env.SMTP_SECURE === 'true',
    SMTP_USER: process.env.SMTP_USER!,
    SMTP_PASS: process.env.SMTP_PASS!,
    SMTP_FROM: process.env.SMTP_FROM!,
    ANFRAGE_RECIPIENT_EMAIL: process.env.ANFRAGE_RECIPIENT_EMAIL!,
    SCHADEN_RECIPIENT_EMAIL: process.env.SCHADEN_RECIPIENT_EMAIL!,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!
  }
}

// Export the validated configuration
export const envConfig = getEnvConfig()
