import { cn } from '@/lib/utils';
import React, { FC, PropsWithChildren } from 'react';

interface IProps {
  className?: string;
}

export const Wrapper: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return (
    <div className={cn('flex my-0 mx-auto w-11/12 max-w-4xl', className)}>
      {children}
    </div>
  );
};
