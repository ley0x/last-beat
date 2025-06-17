import { cn } from '@lib/utils';

type Props = {
  className?: string;
  children: React.ReactNode;
}

export const Wrapper = ({ children, className }: Props) => {
  return (
    <div className={cn('flex my-0 mx-auto w-11/12 max-w-6xl', className)}>
      {children}
    </div>
  );
};
