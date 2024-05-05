'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  const order = await prisma.order.create({
    data,
  })

  revalidatePath('/orders')

  return order
}
