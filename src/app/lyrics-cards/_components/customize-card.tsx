'use client';

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ImageUploader } from "./image-uploader"
import { ToggleBgColor } from "./toggle-bg-color";
import { ToggleShape } from "./toggle-shape"
import { ToggleTxtColor } from "./toggle-txt-color";
import { ToggleTxtSize } from "./toggle-txt-size";

export const CustomizeCard = () => {

  return (
    <ScrollArea className="flex flex-col h-full overflow-y-auto">
      <ToggleShape />
      <ToggleTxtSize />
      <ImageUploader />
      <ToggleBgColor />
      <ToggleTxtColor />
    </ ScrollArea>
  )
}
