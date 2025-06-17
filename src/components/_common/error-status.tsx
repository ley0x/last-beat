import React from 'react'
import Header from './header';
import { cn } from '@lib/utils';

type Props = {
  message: string;
  className?: string;
}

export const ErrorStatus = ({ message, className }: Props) => {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      <Header as="h4" className="text-2xl font-bold">❌ Error</Header>
      <Header as="h5" className="text-gray-400">{message}</Header>
    </div>
  )
}
