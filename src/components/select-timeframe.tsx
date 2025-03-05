"use client";
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom } from "jotai/react";
import { timeframeAtom } from "@/lib/store";
import { Timeframe } from "@/lib/types";

export function SelectTimeframe() {
  const [timeframe, setTimeframe] = useAtom(timeframeAtom);

  const handleValueChange = (value: Timeframe) => {
    setTimeframe(value);
  }

  return (
    <Select defaultValue={timeframe} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a timeframe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select a timeframe</SelectLabel>
          <SelectItem value="7-days">7 days</SelectItem>
          <SelectItem value="1-month">1 month</SelectItem>
          <SelectItem value="3-months">3 months</SelectItem>
          <SelectItem value="6-months">6 months</SelectItem>
          <SelectItem value="12-months">12 months</SelectItem>
          <SelectItem value="overall">Overall</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
