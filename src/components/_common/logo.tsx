import { Disc3 } from 'lucide-react'
import React from 'react'
import Link from "next/link"
import { cn } from '@/lib/utils';

type Props = {
  withText?: boolean;
  notClickable?: boolean;
  className?: string;
  size?: "lg" | "sm";
}

type IconProps = {
  size: "lg" | "sm";
}

const sizeStyle = {
  "lg": "size-8",
  "sm": "size-8 scale-75"
}

const diskSizeStyle = {
  "lg": "size-7",
  "sm": "size-7"
}

const Icon = ({ size }: IconProps) => {
  return (
    <div className={cn("shadow bg-primary rounded flex items-center justify-center", sizeStyle[size])}>
      <Disc3 className={cn("text-white", diskSizeStyle[size])} />
    </div>
  )
}

export const Logo = ({ className, withText, notClickable, size }: Props) => {
  if (!size) size = "lg"

  if (notClickable) return (
    <div className="flex gap-x-2 items-center">
      <Icon size={size} /> {withText && <span className={cn("text-card-foreground underline decoration-primary underline-offset-4", className)}>Last Beat</span>}
    </div>
  )

  return (
    <Link href="/" className="flex gap-x-2 items-center">
      <Icon size={size} /> {withText && <span className={cn("text-card-foreground underline decoration-primary underline-offset-4", className)}>Last Beat</span>}
    </Link>
  )
}
