import React from 'react'
import { Card, CardContent } from './ui/card'
import { BikeIcon, ClockIcon } from 'lucide-react'
import { formatCurrency } from '@/utils/get-product-total-price'

interface MetricsProps {
  deliveryFee: number
  deliveryTimeMinutes: number
}

export const Metrics = ({ deliveryFee, deliveryTimeMinutes }: MetricsProps) => {
  return (
    <Card className="mt-4 bg-transparent">
      <CardContent className="p-2">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="text-sm text-muted-foreground">Entrega</span>
              <BikeIcon className="w-4 h-4" />
            </div>
            <span className="text-muted-foreground text-sm font-semibold">
              {deliveryFee > 0 ? formatCurrency(deliveryFee) : 'Grátis'}
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="text-sm text-muted-foreground">Entrega</span>
              <ClockIcon className="w-4 h-4" />
            </div>
            <span className="text-muted-foreground">
              {deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
