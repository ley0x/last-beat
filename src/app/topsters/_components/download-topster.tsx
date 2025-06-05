"use client";
import { Button } from "@/components/ui/button"
import { Download, LoaderCircle } from "lucide-react"
import { RefObject, useState } from 'react';

import { toPng } from 'html-to-image';
import slugify from "slugify";

import download from 'downloadjs';

type Props = {
  elementRef: RefObject<HTMLDivElement | null>;
}

export const DownloadTopster = ({ elementRef }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleExport = () => {
    setLoading(true);

    if (!elementRef.current) return;
    toPng(elementRef.current, { cacheBust: true, pixelRatio: 2, skipFonts: true })
      .then((dataUrl) => {
        const name = `${slugify("topster", { lower: true })}-card.png`;
        download(dataUrl, name);
        setLoading(false);
      })
      .catch(() => {
        console.error("Error generating image");
        setLoading(false);
      });
  };
  return (
    <Button onClick={() => handleExport()} size="sm" variant="ghost" disabled={loading} className="shrink-0 w-min bg-input/30 border cursor-pointer">
      {loading ? <LoaderCircle className="animate-spin" /> : <Download />}
    </Button>
  )
}
