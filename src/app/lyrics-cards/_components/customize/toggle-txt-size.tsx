import { AArrowDown, AArrowUp, ALargeSmall } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import Header from "@/components/_common/header"
import { useAtom } from "jotai";
import { lcTxtSize } from "@/lib/store";

export function ToggleTxtSize() {
  const [size, setSize] = useAtom(lcTxtSize);
  return (
    <div>
      <Header as="h5">Change text size</Header>
      <ToggleGroup type="single" variant="outline" defaultValue={size}>
        <ToggleGroupItem value="sm" aria-label="Toggle small" onClick={() => setSize("sm")}>
          <AArrowDown />
        </ToggleGroupItem>
        <ToggleGroupItem value="md" aria-label="Toggle medium" onClick={() => setSize("md")}>
          <ALargeSmall />
        </ToggleGroupItem>
        <ToggleGroupItem value="lg" aria-label="Toggle large" onClick={() => setSize("lg")}>
          <AArrowUp />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
