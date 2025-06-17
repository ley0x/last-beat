import { Palette } from "lucide-react"

import { useAtom } from "jotai"

import { Toggle } from "@components/ui/toggle"

import { showGlowyBackgroundAtom } from "@lib/store"

export function ToggleBg() {
  const [, setShow] = useAtom(showGlowyBackgroundAtom);

  return (
    <Toggle size="sm" aria-label="Toggle glowy background on or off." onClick={() => setShow(show => !show)}>
      <Palette />
    </Toggle>
  )
}
