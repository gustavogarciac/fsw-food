import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { OrderItem, OrderItemSkeleton } from './_components/order-item'

async function getOrders(userId: string, pageIndex: number = 0) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    take: 10,
    skip: pageIndex * 10,
  })

  return orders
}

async function OrdersPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    return redirect('/')
  }

  const orders = await getOrders(session.user.id)

  return (
    <Container>
      <Header />

      <div className="px-5 mt-5 md:px-0">
        <SearchInput />
      </div>

      <div className="py-6 px-5 md:px-0">
        <h2 className="font-bold text-xl mb-3">Meus pedidos</h2>

        <div className="space-y-6">
          <Suspense fallback={<OrderItemSkeleton />}>
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </Suspense>
        </div>
      </div>
    </Container>
  )
}

export default OrdersPage
