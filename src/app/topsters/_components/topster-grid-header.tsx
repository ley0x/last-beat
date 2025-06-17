import { Button } from "@components/ui/button"
import { PlusIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"

import { DownloadTopster } from "@topsters/download-topster"
import { DeleteTopster } from "@topsters/delete-topster"
import { RefObject } from "react"

type Props = {
  elementRef: RefObject<HTMLDivElement | null>;
}

export const TopsterGridHeader = ({ elementRef }: Props) => {
  return (
    <header className="flex gap-2 flex-wrap">
      <DeleteTopster />
      <Button size="sm" variant="ghost" className="cursor-pointer shrink-0 w-min bg-input/30 border">
        <PlusIcon />
      </Button>
      <Select>
        <SelectTrigger className="grow cursor-pointer">
          <SelectValue placeholder="🔝 Select your topster" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Topsters</SelectLabel>
            <SelectItem value="apple">Topster 1</SelectItem>
            <SelectItem value="banana">Topster 2</SelectItem>
            <SelectItem value="blueberry">Topster 3</SelectItem>
            <SelectItem value="grapes">Topster 4</SelectItem>
            <SelectItem value="pineapple">Topster 5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <DownloadTopster elementRef={elementRef} />
    </header>
  )
}
