'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { z } from 'zod';
import slugify from 'slugify';

import { DeezerAlbumSchema } from '@/lib/zod/schemas';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DownloadBtn } from './download-btn';
import { CopyBtn } from './copy-btn';
import Divider from '@/components/_common/divider';


type Props = {
  album: z.infer<typeof DeezerAlbumSchema>;
}

export const DeezerAlbum = ({ album }: Props) => {

  return (
    <Card className="flex flex-col w-64 max-w-full gap-1 justify-between shadow-md py-2">
      <CardHeader className="my-0">
        <Link href={album.link} target="_blank" className="block">
          <Image
            src={album.cover_medium}
            alt={`Cover of the album ${album.title}`}
            height={200}
            width={200}
            loading="lazy"
            unoptimized
            className="aspect-square grow mx-auto"
          />
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-sm lg:text-md font-semibold line-clamp-2 ">{album.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-1 break-all">{album.artist.name}</p>
        <Divider className="my-2" />
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          <DownloadBtn label="250x250" link={album.cover_medium} filename={slugify(album.artist + " " + album.title + " cover").toLocaleLowerCase() + ".jpg"} />
          <DownloadBtn label="500x500" link={album.cover_big} filename={slugify(album.artist + " " + album.title + " cover").toLocaleLowerCase() + ".jpg"} />
          <DownloadBtn label="1000x1000" link={album.cover_xl} filename={slugify(album.artist + " " + album.title + " cover").toLocaleLowerCase() + ".jpg"} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <CopyBtn label="250x250" link={album.cover_medium} />
          <CopyBtn label="500x500" link={album.cover_big} />
          <CopyBtn label="1000x1000" link={album.cover_xl} />
        </div>
      </CardFooter>
    </Card>
  );
};
