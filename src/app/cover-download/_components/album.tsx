'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import slugify from 'slugify';
import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn, copyImageToClipboard, findLargestImage } from '@/lib/utils';
import { CheckIcon, Copy, CopyIcon, Download } from 'lucide-react';

type Props = {
  album: z.infer<typeof LastFmSearchAlbumSchema>
}

export const Album = ({ album }: Props) => {
  const toDataURL = async (url: string): Promise<string> => {
    const data = await fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
    return data;
  };

  const [copied, setCopied] = useState<boolean>(false)

  const download = async () => {
    const a = document.createElement("a");
    let link = findLargestImage(album.image);
    if (!link) {
      return;
    }
    a.href = await toDataURL(link);
    a.download =
      slugify(album.artist + " " + album.name + " cover").toLocaleLowerCase() +
      ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copy = async (album: z.infer<typeof LastFmSearchAlbumSchema>) => {
    let link = findLargestImage(album.image);
    if (!link) {
      return;
    }
    await copyImageToClipboard(link);
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  };

  return (
    <Card className="flex flex-col gap-0 justify-between shadow-md w-42 py-2">
      <CardHeader className="my-0">
        <Link href={album.url} target="_blank" className="block">
          <Image
            src={findLargestImage(album.image)}
            alt={`Cover of the album ${album.name}`}
            height={200}
            width={200}
            loading="lazy"
            unoptimized
            className="aspect-square grow mx-auto"
          />
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-sm lg:text-md font-semibold line-clamp-2 ">{album.name}</p>
        <p className="text-sm text-muted-foreground line-clamp-1 break-all">{album.artist}</p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col gap-2">
        <Button
          variant="outline"
          effect="shineHover"
          size="sm"
          className="w-full"
          onClick={download}
        >
          <Download className="mr-2" /> Download
        </Button>
        <Button
          onClick={() => copy(album)}
          variant="outline"
          effect="shineHover"
          size="sm"
          className="w-full disabled:pointer-events-none disabled:cursor-not-allowed"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          disabled={copied}
        >
          <div
            className={cn(
              "flex items-center gap-2 transition-all",
              copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          >
            <CheckIcon
              className="stroke-emerald-500"
              size={16}
              aria-hidden="true"
            />
            Copied
          </div>
          <div
            className={cn(
              "flex items-center gap-3 absolute transition-all",
              copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
            )}
          >
            <CopyIcon size={16} aria-hidden="true" />
            Copy
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};
