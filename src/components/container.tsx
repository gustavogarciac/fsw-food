import { cn } from '@/lib/utils'
import React from 'react'

interface ContainerProps {
  containerClasses?: string
  children: React.ReactNode
}

export const Container = ({ containerClasses, children }: ContainerProps) => {
  return (
    <div className={cn('md:max-w-7xl md:w-full md:mx-auto', containerClasses)}>
      {children}
    </div>
  )
}
