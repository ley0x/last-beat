'use client';

import { lcShowWatermark } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import Image from 'next/image';

type Props = {
  width?: number;
  height?: number;
  className?: string;
}

export const Watermark = ({ width, height, className }: Props) => {

  const [showWatermark] = useAtom(lcShowWatermark);

  if (!showWatermark) return null;

  return (
    <Image
      src="/logo.png"
      alt="watermark"
      width={!!width ? width : 30}
      height={!!height ? height : 30}
      className={cn(className)}
      unoptimized
      loading="lazy"
    />
  )
}
