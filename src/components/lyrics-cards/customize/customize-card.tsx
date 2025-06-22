import { Label } from '@components/ui/label'
import { Switch } from '@components/ui/switch'

import { useAtom } from 'jotai'

import {
  lcShowBgImage,
  lcShowWatermark,
  lcGrayscale,
  lcBlur,
  lcBrightness,
  lcOpacity,
  lcShowQuotes,
  lcShowCredits,
  lcCenterText
} from '@lib/store'

import Header from '@common/header'

import { ToggleBgColor } from './toggle-bg-color'
import { ToggleShape } from './toggle-shape'
import { ToggleTxtColor } from './toggle-txt-color'
import { ToggleTxtSize } from './toggle-txt-size'
import { UploadBgImage } from './upload-bg-image'

export const CustomizeCard = () => {
  const [bgImage, setBgImage] = useAtom(lcShowBgImage)
  const [watermark, setWatermark] = useAtom(lcShowWatermark)
  const [grayscale, setGrayscale] = useAtom(lcGrayscale)
  const [blur, setBlur] = useAtom(lcBlur)
  const [brightness, setBrightness] = useAtom(lcBrightness)
  const [opacity, setOpacity] = useAtom(lcOpacity)
  const [quotes, setShowQuotes] = useAtom(lcShowQuotes)
  const [credits, setShowCredits] = useAtom(lcShowCredits)
  const [center, setCenter] = useAtom(lcCenterText)

  return (
    <div className="flex flex-col gap-2">
      <ToggleShape />
      <ToggleTxtSize />
      <UploadBgImage />
      <ToggleTxtColor />
      <Header as="h5">Background related settings</Header>
      <div className="flex items-center space-x-2">
        <Switch id="lc-show-bg-image" checked={bgImage} onClick={() => setBgImage(elt => !elt)} />
        <Label htmlFor="lc-show-bg-image">Background Image</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-show-watermark" checked={watermark} onClick={() => setWatermark(elt => !elt)} />
        <Label htmlFor="lc-show-watermark">Watermark</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-grayscale" checked={grayscale} onClick={() => setGrayscale(elt => !elt)} />
        <Label htmlFor="lc-grayscale">Grayscale</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-blur" checked={blur} onClick={() => setBlur(elt => !elt)} />
        <Label htmlFor="lc-blur">Blur</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-brightness" checked={brightness} onClick={() => setBrightness(elt => !elt)} />
        <Label htmlFor="lc-brightness">Brightness</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-opacity" checked={opacity} onClick={() => setOpacity(elt => !elt)} />
        <Label htmlFor="lc-opacity">Opacity</Label>
      </div>
      <ToggleBgColor />
      <Header as="h5">Text related settings</Header>
      <div className="flex items-center space-x-2">
        <Switch id="lc-show-quotes" checked={quotes} onClick={() => setShowQuotes(elt => !elt)} />
        <Label htmlFor="lc-show-quotes">Show quotes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-show-credits" checked={credits} onClick={() => setShowCredits(elt => !elt)} />
        <Label htmlFor="lc-show-credits">Show credits</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="lc-center-text" checked={center} onClick={() => setCenter(elt => !elt)} />
        <Label htmlFor="lc-center-text">Center text</Label>
      </div>
    </div>
  )
}
