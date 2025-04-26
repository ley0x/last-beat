'use client';

import { ToggleBgColor } from "./toggle-bg-color";
import { ToggleShape } from "./toggle-shape"
import { ToggleTxtColor } from "./toggle-txt-color";
import { ToggleTxtSize } from "./toggle-txt-size";
import { UploadBgImage } from "./upload-bg-image";

export const CustomizeCard = () => {
  return (
    <div>
      <ToggleShape />
      <ToggleTxtSize />
      <UploadBgImage />
      <ToggleBgColor />
      <ToggleTxtColor />
    </ div>
  )
}
