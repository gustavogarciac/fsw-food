'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  const order = await prisma.order.create({
    data,
  })

  return order
}
