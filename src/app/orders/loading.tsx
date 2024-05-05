import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import React from 'react'
import { OrderItemSkeleton } from './_components/order-item'

const OrdersPageLoading = () => {
  return (
    <Container>
      <Header />

      <div className="px-5 mt-5 md:px-0">
        <SearchInput />
      </div>

      <div className="py-6 px-5 md:px-0">
        <h2 className="font-bold text-xl mb-3">Meus pedidos</h2>
        <OrdersPageLoadingSkeleton />
        <div className="space-y-6"></div>
      </div>
    </Container>
  )
}

const OrdersPageLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <OrderItemSkeleton key={index} />
      ))}
    </div>
  )
}

export default OrdersPageLoading
