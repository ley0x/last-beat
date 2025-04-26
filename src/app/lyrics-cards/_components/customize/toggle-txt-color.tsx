import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import Header from "@/components/_common/header"

import { cn } from "@/lib/utils";
import { colors } from "@/lib/constances";
import { useAtom } from "jotai";
import { lcTxtColor } from "@/lib/store";
import { AvailableColors } from "@/lib/types";


export function ToggleTxtColor() {
  const [color, setColor] = useAtom(lcTxtColor);
  return (
    <div>
      <Header as="h3">Choose a text color</Header>
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
