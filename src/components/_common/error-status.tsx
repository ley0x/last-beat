import { cn } from '@lib/utils';

import Header from '@common/header';

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
