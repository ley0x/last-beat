import { useAtom } from "jotai";
import { z } from "zod";

import { arrayBufferToString } from "@lib/utils";

import { lcLyricsBackground } from "@lib/store";

import { ImageUploader } from "@services/image-uploader";

export const UploadBgImage = () => {
  const [, setSelectedImage] = useAtom(lcLyricsBackground);
  type FileReaderLoadHandler = (this: FileReader, ev: ProgressEvent<FileReader>) => void;
  const handleLoad: FileReaderLoadHandler = function(this) {
    if (!this.result) {
      throw new Error('No result');
    }
    const data = z.string().parse(this.result);
    setSelectedImage(data);

    const string = this.result instanceof ArrayBuffer ? arrayBufferToString(this.result) : this.result;
    setSelectedImage(string);
  }
  return (<ImageUploader handleLoad={handleLoad} />)
}
