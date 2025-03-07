import React from 'react'
import Header from './header';

type Props = {
  message: string;
}

export const ErrorStatus = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <Header as="h4" className="text-2xl font-bold">❌ Error</Header>
      <Header as="h5" className="text-gray-400">{message}</Header>
    </div>

  )
}
