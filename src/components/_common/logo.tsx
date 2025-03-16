import { Music2 } from 'lucide-react'
import React from 'react'

type Props = {
  withText?: boolean;
  className?: string;
}
export const Logo = ({ className, withText }: Props) => {
  return (
    <>
      <Music2 className="text-red-600 text-8xl" />{withText && <span className={className}>Last Beat</span>}
    </>
  )
}
