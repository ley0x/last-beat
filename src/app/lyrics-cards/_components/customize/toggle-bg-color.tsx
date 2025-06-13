import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Header from "@/components/_common/header"

import { cn } from "@/lib/utils";
import { colors } from "@/lib/constants";
import { useAtom } from "jotai";
import { lcBgColor } from "@/lib/store";
import { AvailableColors } from "@/lib/types";

export function ToggleBgColor() {
  const [color, setColor] = useAtom(lcBgColor);
  return (
    <div>
      <Header as="h5">Choose a background color</Header>
      <Header as="h6" className="text-muted-foreground">Useful if no background image is selected</Header>
      <Select value={color} onValueChange={(newValue) => setColor(newValue as AvailableColors)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(colors).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              <div className="flex items-center">
                <div className={cn("w-5 h-5 rounded mr-2", value)}></div>
                <p className="capitalize">{key}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
