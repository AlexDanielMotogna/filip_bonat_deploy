import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as any
export const prisma: PrismaClient = globalForPrisma.__prisma ?? new PrismaClient()
if (!globalForPrisma.__prisma) globalForPrisma.__prisma = prisma

export default prisma