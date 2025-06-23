import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

import { Button } from '@components/ui/button'

const BackToTop = () => {
  const [elt, setElt] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const element = document && document.getElementById('main-layout')
    if (element) {
      setElt(element)
    }
  }, [setElt])

  const scrollToTop = () => {
    if (!elt) return
    elt.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button onClick={scrollToTop} size="icon" variant="outline" className="cursor-pointer rounded-full">
      <ArrowUp className="text-xl" />
    </Button>
  )
}

export default BackToTop
