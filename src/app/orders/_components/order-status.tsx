import { OrderStatus } from '@prisma/client'
import React from 'react'

interface OrderStatusProps {
  status: OrderStatus
}

function getOrderStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.CANCELLED:
      return 'Cancelado'
    case OrderStatus.CONFIRMED:
      return 'Confirmado'
    case OrderStatus.COMPLETED:
      return 'Completado'
    case OrderStatus.PREPARING:
      return 'Em preparo'
    case OrderStatus.DELIVERING:
      return 'Em entrega'
    default:
      return ''
  }
}

export const OrderStatusLabel = ({ status }: OrderStatusProps) => {
  const orderStatus = getOrderStatusLabel(status)

  return (
    <div className="flex items-center justify-center w-fit">
      {status === 'CANCELLED' && (
        <span className="bg-primary text-xs uppercase text-white px-2 py-1 rounded-full font-semibold">
          {orderStatus}
        </span>
      )}
      {status === 'COMPLETED' && (
        <span className="bg-emerald-500 text-xs uppercase text-white px-2 py-1 rounded-full font-semibold">
          {orderStatus}
        </span>
      )}
      {status === 'CONFIRMED' && (
        <span className="bg-muted text-xs uppercase text-muted-foreground px-2 py-1 rounded-full font-semibold">
          {orderStatus}
        </span>
      )}
      {status === 'PREPARING' && (
        <span className="bg-yellow-500 text-xs uppercase text-white px-2 py-1 rounded-full font-semibold">
          {orderStatus}
        </span>
      )}
      {status === 'DELIVERING' && (
        <span className="bg-orange-500 text-xs uppercase text-white px-2 py-1 rounded-full font-semibold">
          {orderStatus}
        </span>
      )}
    </div>
  )
}
