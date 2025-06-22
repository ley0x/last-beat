import { useAtom } from 'jotai'
import { cn } from '@lib/utils'

import { lcShowWatermark } from '@lib/store'

type Props = {
  width?: number
  height?: number
  className?: string
}

export const Watermark = ({ width, height, className }: Props) => {
  const [showWatermark] = useAtom(lcShowWatermark)

  if (!showWatermark) return null

  return (
    <img
      src="/logo.png"
      alt="watermark"
      width={!!width ? width : 30}
      height={!!height ? height : 30}
      className={cn(className)}
      loading="lazy"
    />
  )
}
