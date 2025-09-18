// utils/userDeduplication.ts
import { prisma } from '../prismaClient';
import type { AnfrageSubmission } from './types';

export async function findOrCreateUser(submission: AnfrageSubmission) {
  //find user by email or phone + name
  //1. Buscar por email
  let user = await prisma.user.findUnique({
    where: { email: submission.email }
  });

  // 2. Si no existe por email, buscar por teléfono + nombre
  if (!user && submission.phone) {
    const firstName = submission.name.split(' ')[0]; // Primer nombre

    user = await prisma.user.findFirst({
      where: {
        phone: submission.phone,
        name: { contains: firstName } // Coincidencia parcial del nombre
      }
    });
  }

  // 3. Crear o actualizar usuario
  if (!user) {
    // Usuario nuevo
    user = await prisma.user.create({
      data: {
        email: submission.email,
        name: submission.name,
        phone: submission.phone ?? null
      }
    });
  } else {
    // Usuario existente - actualizar datos si cambiaron
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: submission.name, // Actualizar nombre por si cambió
        phone: submission.phone ?? undefined // Actualizar teléfono
      }
    });
  }

  return user;
}