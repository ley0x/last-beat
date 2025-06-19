'use client';

import React from 'react';
;
import { z } from 'zod';
import slugify from 'slugify';

import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';

import { SpotifyAlbumSchema } from '@lib/schemas';

import { DownloadBtn } from '@covers/download-btn';
import { CopyBtn } from '@covers/copy-btn';

import Divider from '@common/divider';

type Props = {
  album: z.infer<typeof SpotifyAlbumSchema>;
}

export const SpotifyAlbum = ({ album }: Props) => {

  return (
    <Card className="flex flex-col w-64 max-w-full gap-1 justify-between shadow-md py-2">
      <CardHeader className="my-0">
        <img
          src={album.images[0].url}
          alt={`Cover of the album ${album.name}`}
          height={200}
          width={200}
          loading="lazy"
          className="aspect-square grow mx-auto"
        />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-center lg:text-md font-semibold line-clamp-2 ">{album.name}</p>
        <Divider className="my-2" />
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          {album?.images.map((image, id) => <DownloadBtn key={id} label={`${image.width}x${image.height}`} link={image.url} filename={slugify(album.name + " cover").toLocaleLowerCase() + ".jpg"} />)}
        </div>
        <div className="flex flex-col gap-2 w-full">
          {album?.images.map((image, id) => <CopyBtn key={id} label={`${image.width}x${image.height}`} link={image.url} />)}
        </div>
      </CardFooter>
    </Card>
  );
};
