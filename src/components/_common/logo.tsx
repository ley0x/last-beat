import { Music2 } from 'lucide-react'
import React from 'react'
import Link from "next/link"

type Props = {
  withText?: boolean;
  className?: string;
}
export const Logo = ({ className, withText }: Props) => {
  return (
    <Link href="/" className="flex">
      <Music2 className="text-primary text-8xl" />{withText && <span className={className}>Last Beat</span>}
    </Link>
  )
}
