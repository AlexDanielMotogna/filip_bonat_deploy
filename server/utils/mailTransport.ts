import nodemailer from 'nodemailer'
import { envConfig } from '../config/env'

export const transporter = nodemailer.createTransport({
  host: envConfig.SMTP_HOST,
  port: envConfig.SMTP_PORT,
  secure: envConfig.SMTP_SECURE,
  auth: {
    user: envConfig.SMTP_USER,
    pass: envConfig.SMTP_PASS,
  },
})

export async function sendMail(options: nodemailer.SendMailOptions) {
  return transporter.sendMail(options)
}
