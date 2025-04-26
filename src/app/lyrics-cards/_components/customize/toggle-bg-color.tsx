import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import Header from "@/components/_common/header"

import { cn } from "@/lib/utils";
import { colors } from "@/lib/constances";
import { useAtom } from "jotai";
import { lcBgColor } from "@/lib/store";
import { AvailableColors } from "@/lib/types";


export function ToggleBgColor() {
  const [color, setColor] = useAtom(lcBgColor);
  return (
    <div>
      <Header as="h3">Choose a background color</Header>
      <ToggleGroup type="single" variant="outline" defaultValue={color}>
        {Object.entries(colors).map(([key, value]) => (
          <ToggleGroupItem value={key} aria-label={`Toggle ${key}`} key={key} onClick={() => setColor(key as AvailableColors)}>
            <div className={cn("w-5 h-5 aspect-square rounded", value)} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
