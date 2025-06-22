import { RefObject, useState } from 'react'
import { useAtom } from 'jotai'

import { Download, LoaderCircle } from 'lucide-react'

import { Button } from '@components/ui/button'

import { toPng } from 'html-to-image'
import slugify from 'slugify'

import download from 'downloadjs'

import { topsterTitleAtom } from '@lib/store'

type Props = {
  elementRef: RefObject<HTMLDivElement | null>
}

export const DownloadTopster = ({ elementRef }: Props) => {
  const [loading, setLoading] = useState(false)
  const [topsterName] = useAtom(topsterTitleAtom)

  const handleExport = () => {
    setLoading(true)

    if (!elementRef.current) return
    toPng(elementRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      skipFonts: false,
      quality: 1
    })
      .then(dataUrl => {
        const name = slugify(`${topsterName}-topster.png`, { lower: true })
        download(dataUrl, name)
        setLoading(false)
      })
      .catch(e => {
        console.error('Error generating image', e)
        setLoading(false)
      })
  }
  return (
    <Button
      onClick={() => handleExport()}
      size="sm"
      variant="ghost"
      disabled={loading}
      className="shrink-0 w-min bg-input/30 border cursor-pointer"
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <Download />}
    </Button>
  )
}
