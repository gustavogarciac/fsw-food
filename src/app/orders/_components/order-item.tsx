import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/utils/get-product-total-price'
import { Prisma } from '@prisma/client'
import { ChevronRightIcon } from 'lucide-react'
import React from 'react'
import { OrderStatusLabel } from './order-status'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
      restaurant: true
    }
  }>
}

export const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <OrderStatusLabel status={order.status} />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{order.restaurant.name[1]}</AvatarFallback>
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
            </Avatar>

            <span className="font-semibold text-sm">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant={'ghost'} size="icon">
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div>
          {order.orderProducts.map((product) => (
            <div className="flex items-center gap-2" key={product.id}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-muted">
                <span className="text-xs text-muted-foreground font-semibold">
                  {product.quantity}
                </span>
              </div>
              <span className="text-muted-foreground text-sm">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="font-semibold">
            {formatCurrency(Number(order.totalPrice))}
          </span>

          <Button
            className="text-primary text-xs"
            size="sm"
            variant="ghost"
            disabled={order.status !== 'COMPLETED'}
          >
            Repetir pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
