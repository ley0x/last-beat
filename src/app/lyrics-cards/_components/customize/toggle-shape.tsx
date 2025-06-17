import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import Header from "@common/header"
import { useAtom } from "jotai";
import { lcShape } from "@lib/store";

export function ToggleShape() {
  const [shape, setShape] = useAtom(lcShape);
  return (
    <div>
      <Header as="h5">Choose your shape</Header>
      <ToggleGroup type="single" variant="outline" defaultValue={shape}>
        <ToggleGroupItem value="horizontal" aria-label="Toggle horizontal" onClick={() => setShape("horizontal")}>
          <RectangleHorizontal />
        </ToggleGroupItem>
        <ToggleGroupItem value="square" aria-label="Toggle square" onClick={() => setShape("square")}>
          <Square />
        </ToggleGroupItem>
        <ToggleGroupItem value="vertical" aria-label="Toggle vertical" onClick={() => setShape("vertical")}>
          <RectangleVertical />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
